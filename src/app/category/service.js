const sequelize = require("../../database");
const { statusCodes } = require("../../helpers");
const { Op } = require("sequelize");

const db = sequelize.models;

module.exports = {
  //MM-7
  create: async (user, body) => {
    return await sequelize.transaction(async (trx) => {
      const [category] = await Promise.all([
        db.Category.create(body, { transaction: trx }),
        db.Menu.checkPermission(user, body.menuId),
      ]);
      return { id: category.id };
    });
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
    let result = await db.Category.findOne({
      attributes: { exclude: ["menuId"] },
      where: { id },
      include: [
        {
          attributes: ["url"],
          model: db.CategoryIcon,
          as: "icon",
        },
      ],
    });
    if (!result) throw new Exception(statusCodes.ITEM_NOT_FOUND, "Not Found");
    result = result.get({ plain: true });
    result.icon = result.icon.url;

    return result;
  },
  //MM-7
  getAll: async (user, query) => {
    const conditions = {
      menuId: query.menuId,
      [Op.or]: [{ title: { [Op.like]: `${query.q}%` } }, { arTitle: { [Op.like]: `${query.q}%` } }],
    };
    if (query.status) conditions.status = query.status;

    let { count, rows } = await db.Category.findAndCountAll({
      attributes: { exclude: ["menuId"] },
      where: conditions,
      include: [
        {
          attributes: ["url"],
          model: db.CategoryIcon,
          as: "icon",
        },
      ],
      offset: Number(query.offset),
      limit: Number(query.limit),
      order: [["id", "desc"]],
      distinct: true,
    });

    rows = rows.map((val) => {
      val = val.get({ plain: true });
      val.icon = val.icon.url;
      return val;
    });

    return { totalCount: count, data: rows };
  },
};
