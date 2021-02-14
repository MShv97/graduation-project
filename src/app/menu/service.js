const sequelize = require("../../database");
const { statusCodes } = require("../../helpers");
const { Op } = require("sequelize");

const db = sequelize.models;

module.exports = {
  //MM-6
  create: async (user, body, file) => {
    const query = {
      ...body,
      restaurantId: user.restaurantId,
    };

    if (file) query.image = file.path.replace("src\\public\\", "");

    const menu = await db.Menu.create(query);

    return { id: menu.id };
  },
  //MM-6
  update: async (user, id, body, file) => {
    const query = {
      ...body,
    };
    if (file) query.image = file.path.replace("src\\public\\", "");

    await db.Menu.update(query, { where: { id, restaurantId: user.restaurantId } });
  },
  //MM-6
  delete: async (user, id) => {
    await db.Menu.destroy({ where: { id, restaurantId: user.restaurantId } });
  },
  //MM-6
  deleteImage: async (user, id) => {
    await db.Menu.update({ image: null }, { where: { id, restaurantId: user.restaurantId } });
  },
  //MM-6
  getById: async (user, id) => {
    const result = await db.Menu.findByPk(id, {
      attributes: { exclude: ["restaurantId"] },
      where: { restaurantId: user.restaurantId },
    });
    return result;
  },
  //MM-6
  getAll: async (user, query) => {
    const conditions = {
      restaurantId: user.restaurantId,
      [Op.or]: [{ title: { [Op.like]: `${query.q}%` } }, { arTitle: { [Op.like]: `${query.q}%` } }],
    };

    const { count, rows } = await db.Menu.findAndCountAll({
      attributes: { exclude: ["restaurantId"] },
      where: conditions,
      offset: Number(query.offset),
      limit: Number(query.limit),
    });

    return { totalCount: count, data: rows };
  },
  //MM-28
  getTables: async (user, id) => {
    const result = await db.Table.findAll({
      attributes: ["code", "number"],
      where: { restaurantId: user.restaurantId, menuId: id },
    });
    return { data: result };
  },
};
