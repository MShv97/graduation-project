const sequelize = require("../../../database");
const { statusCodes } = require("../../../helpers");
const { Op } = require("sequelize");

const db = sequelize.models;

module.exports = {
  // MM-29
  getAll: async (query) => {
    const { count, rows } = await db.CategoryIcon.findAndCountAll({
      offset: Number(query.offset),
      limit: Number(query.limit),
    });
    return { totalCount: count, data: rows };
  },
  // MM-29
  getById: async (id) => {
    return await db.CategoryIcon.findByPk(id);
  },
};
