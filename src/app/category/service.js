const sequelize = require("../../database");
const { statusCodes } = require("../../helpers");
const { Op } = require("sequelize");

const db = sequelize.models;

module.exports = {
  //MM-7
  create: async (user, body) => {
    let category;
    await sequelize.transaction(async (trx) => {
      [category] = await Promise.all([
        // check permission
        db.Menu.checkPermission(user, body.menuId),
        // create
        db.Category.create(body, { transaction: trx }),
      ]);
    });
    return { categoryId: category.id };
  },
  //MM-7
  update: async (user, id, body) => {
    await sequelize.transaction(async (trx) => {
      await Promise.all([
        //check permission to category
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
        //check permission to category
        db.Category.checkPermission(user, id),
        //delete
        db.Category.destroy({ where: { id }, transaction: trx }),
      ]);
    });
  },
  //MM-7
  getById: async (user, id, query) => {
    const result = await db.Category.findOne({
      attributes: { exclude: ["menuId"] },
      where: { id },
    });
    if (!result) throw new Exception(statusCodes.ITEM_NOT_FOUND, "Not Found");
    return result;
  },
  //MM-7
  getAll: async (user, query) => {
    const conditions = {
      menuId: query.menuId,
      [Op.or]: [{ title: { [Op.like]: `${query.q}%` } }, { arTitle: { [Op.like]: `${query.q}%` } }],
    };
    if (query.status) conditions.status = query.status;

    const { count, rows } = await db.Category.findAndCountAll({
      attributes: { exclude: ["menuId"] },
      where: conditions,
      offset: Number(query.offset),
      limit: Number(query.limit),
      order: [["id", "desc"]],
    });
    return { totalCount: count, data: rows };
  },
};
