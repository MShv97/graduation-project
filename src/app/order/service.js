const sequelize = require("../../database");
const { statusCodes } = require("../../helpers");
const { Op } = require("sequelize");

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
      if (dishIds.size) throw new Exception(statusCodes.ITEM_NOT_FOUND, `Dishes [${[...dishIds]}] Not Found`, [...dishIds]);

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
          include: [{ attributes: ["id"], model: db.Client, include: [{ attributes: ["restaurantId"], model: db.Table }] }],
        }),
        db.Order.update(body, { where: { id }, transaction }),
      ]);
      if (!order) throw new Exception(statusCodes.ITEM_NOT_FOUND);
      if (order.status !== "pending") throw new Exception(statusCodes.INVALID_OPERATION, `Order status is ${order.status}.`, { status: order.status });

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
    let [orders] = await Promise.all([db.Order.findAll({ attributes: ["id"], where: conditions }), db.Order.update({ userId: user.userId, ...body }, { where: conditions, transaction })]);

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
      attributes: ["id", "amount", "note", "status", "createdAt"],
      include: [
        {
          attributes: ["id"],
          model: db.Client,
          include: [{ attributes: ["number"], model: db.Table }],
        },
        {
          required: true,
          attributes: ["id", "name", "arName", "categoryId"],
          where: dishConditions,
          model: db.Dish,
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
      val.dish = val.Dish;

      delete val.Dish && delete val.Client;

      return val;
    });

    return { totalCount: count, data: rows };
  },
  //MM-27
  getById: async (user, id) => {
    let result = await db.Order.findOne({
      where: { id },
      attributes: { exclude: ["dishId", "clientId", "userId"] },
      include: [
        {
          attributes: ["id"],
          model: db.Client,
          include: [{ attributes: ["number"], model: db.Table }],
        },
        {
          attributes: ["id", "name", "arName"],
          where: { restaurantId: user.restaurantId },
          model: db.Dish,
          include: [
            {
              attributes: { exclude: ["menuId"] },
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
    result.Dish.category.icon = result.Dish.category.icon.url;
    result.table = result.Client.Table.number;
    result.dish = result.Dish;
    delete result.Dish && delete result.Client;

    return result;
  },
  // MM-31
  getStatusCount: async (user, query) => {
    const criteria = {};
    if (query.from && query.to) criteria.createdAt = { [Op.between]: [query.from, query.to] };
    if (query.from) criteria.createdAt = { [Op.gte]: query.from };
    if (query.to) criteria.createdAt = { [Op.lte]: query.to };
    let result = await db.Order.findOne({
      where: criteria,
      attributes: [
        [sequelize.fn("Count", sequelize.col("Order.id")), "total"],
        [sequelize.literal("COUNT (CASE Order.status when 'pending' THEN 1 ELSE NULL END)"), "pending"],
        [sequelize.literal("COUNT (CASE Order.status when 'canceled' THEN 1 ELSE NULL END)"), "canceled"],
        [sequelize.literal("COUNT (CASE Order.status when 'ready' THEN 1 ELSE NULL END)"), "ready"],
        [sequelize.literal("COUNT (CASE Order.status when 'done' THEN 1 ELSE NULL END)"), "done"],
        [sequelize.literal("COUNT (CASE Order.status when 'cooking' THEN 1 ELSE NULL END)"), "cooking"],
        [sequelize.literal("COUNT (CASE Order.status when 'out of stock' THEN 1 ELSE NULL END)"), "out of stock"],
      ],
      include: [
        {
          required: true,
          attributes: ["id"],
          where: { restaurantId: user.restaurantId },
          model: db.Dish,
        },
      ],
    });
    result = result.get({ plain: true });
    delete result.Dish;
    return result;
  },
};
