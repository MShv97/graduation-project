const sequelize = require("../../database");
const { statusCodes } = require("../../helpers");
const { Op } = require("sequelize");

const db = sequelize.models;

module.exports = {
  // MM-30
  getById: async (id) => {
    const result = await db.Allergy.findOne({
      where: id,
    });
    if (!result) return;
    return result;
  },
  getAll: async (query) => {
    const { count, rows } = await db.Allergy.findAndCountAll({
      offset: Number(query.offset),
      limit: Number(query.limit),
      distinct: true,
    });
    return { totalCount: count, data: rows };
  },
};
