const sequelize = require("../../datebase");
const { statusCodes } = require("../../helpers");
const { Op } = require("sequelize");

const db = sequelize.models;

module.exports = {
  //MM-6
  create: async (user, body) => {
    const restaurant = user.restaurantId;
    await sequelize.transaction(async (trx) => {
      db.Menu.create({ ...body, restaurantId: restaurant }, { transaction: trx });
    });
  },
  //MM-6
  update: async (user, id, body) => {
    //check premssion to menu
    await db.Menu.checkPermission(user, id);
    // update
    await sequelize.transaction(async (trx) => {
      db.Menu.update(body, { where: { id }, transaction: trx });
    });
  },
  //MM-6
  delete: async (user, id) => {
    await sequelize.transaction(async (trx) => {
      await Promise.all([
        //check premssion to menu
        db.Menu.checkPermission(user, id),
        //delete
        db.Menu.destroy({ where: { id }, transaction: trx }),
      ]);
    });
  },
  //MM-6
  getById: async (user, id) => {
    const result = await db.Menu.findOne({
      attributes: ["id"],
      where: { id, restaurantId: user.restaurantId },
    });
    if (!result) throw new Exception(statusCodes.ITEM_NOT_FOUND, "Not Found");
    return { data: result };
  },
  //MM-6
  getAll: async (user, query) => {
    const { count, rows } = await db.Menu.findAndCountAll({
      where: { restaurantId: user.restaurantId, name: { [Op.like]: `%${query.q}%` } },
      include: [{ attributes: { exclude: ["menuId"] } }],
      offset: Number(query.offset),
      limit: Number(query.limit),
    });
    if (rows.length == 0) throw new Exception(statusCodes.ITEM_NOT_FOUND, "Not Found");
    return { totalCount: count, data: rows };
  },
};
