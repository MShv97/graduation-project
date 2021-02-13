const sequelize = require("../../database");
const { statusCodes } = require("../../helpers");
const { Op } = require("sequelize");

const db = sequelize.models;

module.exports = {
  //MM-27
  create: async (body) => {
    return await sequelize.transaction(async (trx) => {
      // find table and change to busy
      const table = await db.Table.findOne({
        attributes: ["id", "status"],
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

      const [client, dishes] = await Promise.all([
        db.Client.create({ tableId: table.id }, { transaction: trx }),
        db.Dish.findAll({ attributes: ["id", "price", "discount"], where: { id: [...dishIds] } }),
        table.save({ transaction: trx }),
      ]);

      dishes.forEach((val) => dishIds.delete(val.id));
      if (dishIds.size) throw new Exception(statusCodes.ITEM_NOT_FOUND, `Dishes [${[...dishIds]}] Not Found`);

      let orders = dishes.map((val) => ({
        clientId: client.id,
        dishId: val.id,
        price: val.price - val.price * val.discount,
        amount: dishesById[val.id].amount,
        note: dishesById[val.id].note,
      }));

      orders = await db.Order.bulkCreate(orders, { transaction: trx });
      orders = orders.map((val) => _.pick(val, ["id", "dishId", "status"]));

      return { orders };
    });
  },
  //MM-27
  update: async (id, body) => {
    await sequelize.transaction(async (trx) => {
      const [order] = await Promise.all([
        db.Order.findByPk(id, { attributes: ["status"] }),
        db.Order.update(body, { where: { id }, transaction: trx }),
      ]);
      if (order.status !== "pending") throw new Exception(statusCodes.INVALID_OPERATION, "Order is being cooked.");
    });
  },
  //MM-27
  updateStatus: async (user, id, body) => {
    await db.Order.update({ userId: user.userId, ...body }, { where: { id } });
  },
  //MM-27
  getAll: async (user, query) => {
    const conditions = _.pick(query, ["status"]);
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
};
