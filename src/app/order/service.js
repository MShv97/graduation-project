const sequelize = require("../../database");
const { statusCodes } = require("../../helpers");
const { Op, literal, fn } = require("sequelize");

const db = sequelize.models;

module.exports = {
  //MM-27
  create: async (body) => {
    return await sequelize.transaction(async (transaction) => {
      // find table and change to busy
      const table = await db.Table.findOne({
        attributes: ["id", "status", "restaurantId"],
        where: { code: body.tableCode },
      });
      if (!table) throw new Exception(statusCodes.ITEM_NOT_FOUND, "Table not Found");
      table.status = "busy";

      // categories dishes
      const { dishIds, dishesById } = body.dishes.reduce(
        (prev, curr) => {
          prev.dishIds.add(curr.id);
          prev.dishesById[curr.id] = curr;

          return prev;
        },
        { dishIds: new Set(), dishesById: {} }
      );
      if (dishIds.size !== body.dishes.length) throw new Exception(statusCodes.BAD_REQUEST, `Duplicate dish id.`);

      // create client and check the dishes
      const [client, dishes] = await Promise.all([
        db.Client.create({ tableId: table.id }, { transaction }),
        db.Dish.findAll({
          attributes: ["id", "price", "discount"],
          where: { id: [...dishIds], restaurantId: table.restaurantId },
        }),
        table.save({ transaction }),
      ]);

      dishes.forEach((val) => dishIds.delete(val.id));
      if (dishIds.size)
        throw new Exception(statusCodes.ITEM_NOT_FOUND, `Dishes [${[...dishIds]}] Not Found`, [...dishIds]);

      // prepare orders
      let orders = dishes.map((val) => ({
        clientId: client.id,
        dishId: val.id,
        price: val.price - val.price * val.discount,
        amount: dishesById[val.id].amount,
        note: dishesById[val.id].note,
      }));

      orders = await db.Order.bulkCreate(orders, { transaction });
      orders = orders.map((val) => _.pick(val, ["id", "dishId", "status"]));

      // raise socket event
      const orderIds = orders.map((val) => val.id);
      io.to("order:" + table.restaurantId).emit("order-create", { orderIds });

      return { orders };
    });
  },
  //MM-27
  update: async (id, body) => {
    await sequelize.transaction(async (transaction) => {
      // check order and update
      const [order] = await Promise.all([
        db.Order.findByPk(id, {
          attributes: ["id", "amount", "note", "status"],
          include: [
            { attributes: ["id"], model: db.Client, include: [{ attributes: ["restaurantId"], model: db.Table }] },
          ],
        }),
        db.Order.update(body, { where: { id }, transaction }),
      ]);
      if (!order) throw new Exception(statusCodes.ITEM_NOT_FOUND);
      if (order.status !== "pending")
        throw new Exception(statusCodes.INVALID_OPERATION, `Order status is ${order.status}.`, {
          status: order.status,
        });

      // raise socket event
      io.to("order:" + order.Client.Table.restaurantId).emit("order-update", { id, ...body });
    });
  },
  //MM-27
  updateStatus: async (user, id, body, dishId, transaction) => {
    const conditions = {};
    if (id) conditions.id = id;
    if (dishId) {
      conditions.dishId = dishId;
      conditions.status = "pending";
    }

    // check orders and update
    let [orders] = await Promise.all([
      db.Order.findAll({ attributes: ["id"], where: conditions }),
      db.Order.update({ userId: user.userId, ...body }, { where: conditions, transaction }),
    ]);

    // raise socket event
    if (orders.length) {
      const orderIds = orders.map((val) => val.id);
      io.to("order:" + user.restaurantId).emit("order-update", { id: orderIds, ...body });
    }
  },
  //MM-27
  getAll: async (user, query) => {
    const conditions = _.pick(query, ["status", "id"]);
    const dishConditions = {
      restaurantId: user.restaurantId,
      ..._.pick(query, "categoryId"),
    };

    let { count, rows } = await db.Order.findAndCountAll({
      where: conditions,
      attributes: { exclude: ["price", "clientId", "dishId", "userId"] },
      include: [
        {
          attributes: ["id"],
          model: db.Client,
          include: [{ attributes: ["number"], model: db.Table }],
        },
        {
          required: true,
          attributes: ["id", "name", "arName", "status", "categoryId"],
          where: dishConditions,
          model: db.Dish,
          as: "dish",
        },
      ],
      offset: Number(query.offset),
      limit: Number(query.limit),
      order: [["id", "asc"]],
      distinct: true,
    });

    rows = rows.map((val) => {
      val = val.get({ plain: true });
      val.table = val.Client.Table.number;

      delete val.Client;

      return val;
    });

    return { totalCount: count, data: rows };
  },
  //MM-27
  getById: async (user, id) => {
    let result = await db.Order.findOne({
      where: { id },
      attributes: { exclude: ["price", "clientId", "dishId", "userId"] },
      include: [
        {
          attributes: ["id"],
          model: db.Client,
          include: [{ attributes: ["number"], model: db.Table }],
        },
        {
          attributes: ["id", "name", "arName", "status"],
          where: { restaurantId: user.restaurantId },
          model: db.Dish,
          as: "dish",
          include: [
            {
              attributes: { exclude: ["menuId", "createdAt", "updatedAt", "deletedAt"] },
              model: db.Category,
              as: "category",
              include: [{ attributes: ["url"], model: db.CategoryIcon, as: "icon" }],
            },
          ],
        },
      ],
    });
    if (!result) return;

    result = result.get({ plain: true });
    result.dish.category.icon = result.dish.category.icon.url;
    result.table = result.Client.Table.number;

    delete result.Client;

    return { data: result };
  },
  // MM-31
  getStatusCount: async (user, query) => {
    const conditions = {};
    if (query.from) conditions.createdAt = { [Op.gte]: query.from };
    if (query.to) conditions.createdAt = { [Op.lte]: query.to };
    if (query.from && query.to) conditions.createdAt = { [Op.between]: [query.from, query.to] };

    const counts = await db.Order.findAll({
      where: conditions,
      attributes: ["status", [fn("Count", sequelize.col("Order.id")), "count"]],
      raw: true,
      include: [
        {
          required: true,
          attributes: ["id"],
          where: { restaurantId: user.restaurantId },
          model: db.Dish,
          as: "dish",
        },
      ],
      group: "Order.status",
    });

    const result = db.Order.STATUS.reduce((prev, curr) => {
      prev[curr] = 0;
      return prev;
    }, {});

    counts.forEach((val) => (result[val.status] = val.count));

    return { data: result };
  },
};
