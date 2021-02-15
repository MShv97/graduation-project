const sequelize = require("../../database");
const { statusCodes } = require("../../helpers");
const { Op } = require("sequelize");

const db = sequelize.models;

module.exports = {
  // MM-30
  getAll: async (query) => {
    const { count, rows } = await db.CategoryIcon.findAndCountAll({
      offset: Number(query.offset),
      limit: Number(query.limit),
      distinct: true,
    });
    return { totalCount: count, data: rows };
  },
};
