const sequelize = require("../../database");
const { statusCodes } = require("../../helpers");
const { Op } = require("sequelize");

const db = sequelize.models;

module.exports = {
  // MM-29
  getById: async (id) => {
    return await db.Allergy.findByPk(id);
  },
  // MM-29
  getAll: async ({ offset, limit, q, order }) => {
    const { count, rows } = await db.Allergy.findAndCountAll({
      where: { [Op.or]: [{ name: { [Op.like]: `${q}%` } }, { arName: { [Op.like]: `${q}%` } }] },
      offset: Number(offset),
      limit: Number(limit),
      order: [[order, "asc"]],
    });
    return { totalCount: count, data: rows };
  },
};
