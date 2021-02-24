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
    await db.Subscription.update(body, { where: { id } });
  },

  delete: async (id) => {
    const rows = await db.Subscription.destroy({ where: { id } });
    if (!rows) throw new Exception(statusCodes.ITEM_NOT_FOUND);
  },

  getById: async (id) => {
    const result = await db.Subscription.findByPk(id);
    if (!result) return;
    return { data: result };
  },

  getAll: async () => {
    const { count, rows } = await db.Subscription.findAndCountAll();
    return { totalCount: count, data: rows };
  },
};
