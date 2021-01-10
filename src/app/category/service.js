const sequelize = require("../../datebase");
const { statusCodes } = require("../../helpers");
const { Op } = require("sequelize");

const db = sequelize.models;

module.exports = {
  //MM-7
  create: async (user, body) => {
    await sequelize.transaction(async (trx) => {
      await Promise.all([db.Menu.checkPermission(user, body.menuId), db.Category.create(body, { transaction: trx })]);
    });
  },
  //MM-7
  update: async (user, id, body) => {
    await sequelize.transaction(async (trx) => {
      await Promise.all([
        //check premssion to category
        db.Category.checkPermission(user, id),
        // update
        db.Category.update(body, { where: { id }, transaction: trx }),
      ]);
    });
  },
  //MM-7
  delete: async (user, id) => {
    await sequelize.transaction(async (trx) => {
      await Promise.all([
        //check premssion to category
        db.Category.checkPermission(user, id),
        //delete
        db.Category.destroy({ where: { id }, transaction: trx }),
      ]);
    });
  },
  //MM-7
  getById: async (user, id) => {
    const result = await db.Category.findOne({
      where: { id },
      include: [
        {
          required: true,
          attributes: [],
          model: db.Menu,
          where: { restaurantId: user.restaurantId },
        },
      ],
    });
    if (!result) throw new Exception(statusCodes.ITEM_NOT_FOUND, "Not Found");
    return { data: result };
  },
  //MM-7
  getAll: async (user, query) => {
    const { count, rows } = await db.Category.findAndCountAll({
      where: { menuId: query.menuId, name: { [Op.like]: `%${query.q}%` } },
      include: [
        { attributes: { exclude: ["categoryId"] } },
        {
          required: true,
          attributes: [],
          model: db.Menu,
          where: { restaurantId: user.restaurantId },
        },
      ],
      offset: Number(query.offset),
      limit: Number(query.limit),
    });
    if (rows.length == 0) throw new Exception(statusCodes.ITEM_NOT_FOUND, "Not Found");
    return { totalCount: count, data: rows };
  },
};
