const sequelize = require("../../database");
const { statusCodes } = require("../../helpers");
const { Op } = require("sequelize");

const db = sequelize.models;

module.exports = {
  // MM-29
  getByCode: async (code, query) => {
    let result = await db.Table.findOne({
      where: { code },
      attributes: ["number", "code"],
      include: [
        { required: true, model: db.Restaurant, as: "restaurant" },
        {
          required: true,
          attributes: { exclude: ["restaurantId"] },
          model: db.Menu,
          as: "menu",
          include: [
            {
              attributes: { exclude: ["menuId", "deletedAt"] },
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
    const table = {
      number: result.number,
      code: result.code,
    };
    result.table = table;
    delete result.number && delete result.code && delete result.menu.categories;
    return result;
  },
};
