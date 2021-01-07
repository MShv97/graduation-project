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
      db.Dish.create({ ...body, category_id: body.categoryId }, { transaction: trx });
      if (files) {
        const images = files.map((val) => ({
          path: val.path.replace("src\\public\\", ""),
          dish_id: dish.id,
        }));
        db.DishImage.bulkCreate(images, { transaction: trx });
      }
    });
  },
  //MM-8
  update: async (user, id, body, files) => {
    //check premssion to dish
    await db.Dish.checkPermission(user, id);
    // update
    await sequelize.transaction(async (trx) => {
      await db.Dish.update(body, { where: { id }, transaction: trx });
      if (files) {
        const images = files.map((val) => ({
          path: val.path.replace("src\\public\\", ""),
          dish_id: id,
        }));
        await db.DishImage.bulkCreate(images, { transaction: trx });
      }
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
        { model: db.DishImage, as: "images" },
        {
          required: true,
          attributes: [],
          model: db.Category,
          include: [{ attributes: [], model: db.Menu, where: { restaurant_id: user.restaurantId } }],
        },
      ],
    });
    if (!result) throw new Exception(statusCodes.ITEM_NOT_FOUND, "Not Found");
    return { data: result };
  },
  //MM-16
  getAll: async (user, query) => {
    const { count, rows } = await db.Dish.findAndCountAll({
      where: { category_id: query.categoryId, name: { [Op.like]: `%${query.q}%` } },
      include: [
        { model: db.DishImage, as: "images" },
        {
          required: true,
          attributes: [],
          model: db.Category,
          include: [{ attributes: [], model: db.Menu, where: { restaurant_id: user.restaurantId } }],
        },
      ],
      offset: Number(query.offset),
      limit: Number(query.limit),
    });
    if (rows.length == 0) if (!result) throw new Exception(statusCodes.ITEM_NOT_FOUND, "Not Found");
    return { totalCount: count, data: rows };
  },
};
