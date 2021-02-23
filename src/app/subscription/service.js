const sequelize = require("../../database");
const { statusCodes } = require("../../helpers");
const { Op } = require("sequelize");

const db = sequelize.models;

module.exports = {
  create: async (body) => {
    const subscription = await db.Subscription.create(body);
    return { id: subscription.id };
  },
  update: async (body, id) => {
    const subscription = await db.Subscription.update(body, { where: { id } });
  },
  delete: async (id) => {
    const rows = await db.Subscription.destroy({ where: { id } });
    if (!rows) throw new Exception(statusCodes.ITEM_NOT_FOUND, "Not Found");
  },
  getById: async (id) => {
    return await db.Subscription.findByPk(id);
  },
  getAll: async ({ offset, limit }) => {
    const { count, rows } = await db.Subscription.findAndCountAll({
      offset: Number(offset),
      limit: Number(limit),
    });
    return { totalCount: count, data: rows };
  },
};
