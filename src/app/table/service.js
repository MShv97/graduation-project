const sequelize = require("../../database");
const { statusCodes } = require("../../helpers");
const { Op } = require("sequelize");

const db = sequelize.models;

module.exports = {
  // MM-30
  getByCode: async (code) => {
    let result = await db.Table.findOne({
      where: code,
      attributes: ["number"],
      include: [
        {
          required: true,
          attributes: ["id", "name", "logo"],
          model: db.Restaurant,
          as: "Restaurant",
        },
        {
          required: true,
          attributes: ["id", "title", "arTitle", "image"],
          model: db.Menu,
          as: "Menu",
          include: [
            {
              attributes: ["id", "title", "arTitle", "status"],
              model: db.Category,
              as: "Categories",
              include: [{ attributes: ["url"], model: db.CategoryIcon, as: "icon" }],
            },
          ],
        },
      ],
    });
    if (!result) return;
    result = result.get({ plain: true });
    result.Categories = result.Menu.Categories;
    delete result.Menu.Categories;
    return result;
  },
};
