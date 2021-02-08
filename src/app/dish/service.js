const sequelize = require("../../database");
const { statusCodes } = require("../../helpers");
const { Op } = require("sequelize");

const db = sequelize.models;

module.exports = {
  //MM-8
  create: async (user, body, files) => {
    await sequelize.transaction(async (trx) => {
      const [dish] = await Promise.all([
        db.Dish.create(body, { transaction: trx }),
        //check permission to category
        db.Category.checkPermission(user, body.categoryId),
      ]);

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
    //check permission to dish
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
    await sequelize.transaction(async (trx) => {
      await Promise.all([
        //check premssion to dish
        db.Dish.checkPermission(user, id),
        //delete
        db.Dish.destroy({ where: { id }, transaction: trx }),
      ]);
    });
  },
  //MM-16
  getById: async (user, id) => {
    const result = await db.Dish.findOne({
      where: { id },
      include: [{ attributes: { exclude: ["dishId"] }, model: db.DishImage, as: "images" }],
    });
    return result;
  },
  //MM-16
  getAll: async (user, query) => {
    const { count, rows } = await db.Dish.findAndCountAll({
      where: { categoryId: query.categoryId, name: { [Op.like]: `%${query.q}%` } },
      include: [{ attributes: { exclude: ["dishId"] }, model: db.DishImage, as: "images" }],
      offset: Number(query.offset),
      limit: Number(query.limit),
      distinct: true,
    });
    return { totalCount: count, data: rows };
  },
};
