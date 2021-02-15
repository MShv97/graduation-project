const sequelize = require("../../database");
const { statusCodes } = require("../../helpers");
const { Op } = require("sequelize");

const db = sequelize.models;

module.exports = {
  // MM-29
  getByCode: async (code, query) => {
    let result = await db.Table.findOne({
      where: { code },
      attributes: ["number"],
      include: [
        { required: true, model: db.Restaurant, as: "restaurant" },
        {
          required: true,
          attributes: { exclude: ["restaurantId"] },
          model: db.Menu,
          as: "menu",
          include: [
            {
              attributes: { exclude: ["menuId"] },
              model: db.Category,
              as: "categories",
              limit: Number(query.limit),
              include: [{ attributes: ["url"], model: db.CategoryIcon, as: "icon" }],
            },
          ],
        },
      ],
    });
    if (!result) return;

    result = result.get({ plain: true });
    result.categories = result.menu.categories.map((val) => {
      val.icon = val.icon.url;
      return val;
    });
    delete result.menu.categories;

    return result;
  },
};
