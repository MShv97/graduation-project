const sequelize = require("../../datebase");
const { statusCodes } = require("../../helpers");
const { Op } = require("sequelize");

const db = sequelize.models;

module.exports = {
  //MM-8
  create: async (user, body, files) => {
    //TODO
    //check premssion to category
    await sequelize.transaction(async (trx) => {
      const dish = await db.Dish.create(body, { transaction: trx });
      if (files) {
        const images = files.map((val) => ({
          dishId: dish.id,
          path: val.path.replace("src\\public\\", ""),
        }));
        await db.DishImage.bulkCreate(images, { transaction: trx });
      }
    });
  },
  //MM-8
  update: async (user, id, body, files) => {
    //check premssion to dish
    await db.Dish.checkPermission(user, id);

    let images = [];
    if (files) {
      images = files.map((val) => ({
        path: val.path.replace("src\\public\\", ""),
        dishId: id,
      }));
    }
    // update
    await sequelize.transaction(async (trx) => {
      await Promise.all([
        db.Dish.update(body, { where: { id }, transaction: trx }),
        db.DishImage.bulkCreate(images, { transaction: trx }),
      ]);
    });
  },
  //MM-8
  delete: async (user, id) => {
    //check premssion to dish
    await db.Dish.checkPermission(user, id);
    //delete
    await db.Dish.destroy({ where: { id } });
  },
  //MM-16
  getById: async (user, id) => {
    const result = await db.Dish.findOne({
      where: { id },
      include: [
        { attributes: { exclude: ["dishId"] }, model: db.DishImage, as: "images" },
        {
          required: true,
          attributes: [],
          model: db.Category,
          include: [{ attributes: [], model: db.Menu, where: { restaurantId: user.restaurantId } }],
        },
      ],
    });
    if (!result) throw new Exception(statusCodes.ITEM_NOT_FOUND, "Not Found");
    return { data: result };
  },
  //MM-16
  getAll: async (user, query) => {
    const { count, rows } = await db.Dish.findAndCountAll({
      where: { categoryId: query.categoryId, name: { [Op.like]: `%${query.q}%` } },
      include: [
        { attributes: { exclude: ["dishId"] }, model: db.DishImage, as: "images" },
        {
          required: true,
          attributes: [],
          model: db.Category,
          include: [{ attributes: [], model: db.Menu, where: { restaurantId: user.restaurantId } }],
        },
      ],
      offset: Number(query.offset),
      limit: Number(query.limit),
    });
    if (rows.length == 0) if (!result) throw new Exception(statusCodes.ITEM_NOT_FOUND, "Not Found");
    return { totalCount: count, data: rows };
  },
};
