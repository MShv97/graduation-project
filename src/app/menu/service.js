const sequelize = require("../../database");
const { statusCodes } = require("../../helpers");
const { Op } = require("sequelize");

const db = sequelize.models;

module.exports = {
  //MM-6
  create: async (user, body, file) => {
    if (file) {
      const image = file.path.replace("src\\public\\", "");
      await db.Menu.create({ ...body, image: image, restaurantId: user.restaurantId });
    } else {
      await db.Menu.create({ ...body, restaurantId: user.restaurantId });
    }
  },
  //MM-6
  update: async (user, id, body, file) => {
    if (file) {
      const image = path.replace("src\\public\\", "");
      await db.Menu.update({ ...body, image: image }, { where: { id, restaurantId: user.restaurantId } });
    } else {
      await db.Menu.update(body, { where: { id, restaurantId: user.restaurantId } });
    }
  },
  //MM-6
  delete: async (user, id) => {
    await db.Menu.destroy({ where: { id, restaurantId: user.restaurantId } });
  },
  //MM-6
  getById: async (user, id) => {
    const result = await db.Menu.findOne({
      attributes: { exclude: ["restaurantId"] },
    });
    return result;
  },
  //MM-6
  getAll: async (user, query) => {
    const { count, rows } = await db.Menu.findAndCountAll({
      attributes: { exclude: ["restaurantId"] },
      where: { name: { [Op.like]: `%${query.q}%` } },
      offset: Number(query.offset),
      limit: Number(query.limit),
    });

    return { totalCount: count, data: rows };
  },
};
