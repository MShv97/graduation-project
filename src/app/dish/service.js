const sequelize = require("../../database");
const { statusCodes } = require("../../helpers");
const { Op } = require("sequelize");
const Order = require("../order/service");

const db = sequelize.models;

module.exports = {
  //MM-8
  create: async (user, body, files) => {
    return await sequelize.transaction(async (transaction) => {
      const [dish] = await Promise.all([
        // create dish
        db.Dish.create({ ...body, restaurantId: user.restaurantId }, { transaction }),
        //check permission to category
        db.Category.checkPermission(user, body.categoryId),
      ]);

      const images = files?.map((val) => ({
        dishId: dish.id,
        path: val.path.replace("src\\public\\", ""),
      }));

      await Promise.all([
        // link allergies
        dish.setAllergies(body.allergies, { transaction }),
        db.DishImage.bulkCreate(images || [], { transaction }),
      ]);

      return { id: dish.id };
    });
  },
  //MM-8
  update: async (user, id, body, files) => {
    await sequelize.transaction(async (transaction) => {
      const images = files?.map((val) => ({
        path: val.path.replace("src\\public\\", ""),
        dishId: id,
      }));

      const [dish] = await Promise.all([
        db.Dish.checkPermission(user, id),
        db.Dish.update(body, { where: { id }, transaction }),
        db.DishImage.bulkCreate(images || [], { transaction }),
      ]);

      const allergies = [...body.allergies].filter((val) => !dish.allergies.find((v) => v.id == val));
      await dish.addAllergies(allergies, { transaction });

      /**
       * In case of updating the status of dish to disabled
       * update all on pending orders on this dish to out of stock
       */
      if (body.status == "disabled") {
        await Order.updateStatus(user, null, { status: "out of stock" }, id, transaction);
      }
    });
  },
  //MM-30
  changeStatus: async (user, id, body) => {
    await sequelize.transaction(async (transaction) => {
      const [dish] = await Promise.all([
        db.Dish.checkPermission(user, id),
        db.Dish.update(body, { where: { id }, transaction }),
      ]);

      /**
       * In case of updating the status of dish to disabled
       * update all on pending orders on this dish to out of stock
       */
      if (body.status == "disabled") {
        await Order.updateStatus(user, null, { status: "out of stock" }, id, transaction);
      }
    });
  },
  //MM-8
  delete: async (user, id) => {
    await sequelize.transaction(async (transaction) => {
      await Promise.all([
        //check permission to dish
        db.Dish.checkPermission(user, id),
        //delete
        db.Dish.destroy({ where: { id }, transaction }),
      ]);
    });
  },
  //MM-16
  getById: async (user, id) => {
    let result = await db.Dish.findOne({
      attributes: { exclude: ["restaurantId", "categoryId"] },
      where: { id },
      include: [
        {
          attributes: { exclude: ["menuId", "deletedAt"] },
          model: db.Category,
          as: "category",
          include: [{ model: db.CategoryIcon, as: "icon" }],
        },
        { attributes: { exclude: ["dishId"] }, model: db.DishImage, as: "images" },
        { model: db.Allergy, as: "allergies", through: { attributes: [] } },
      ],
    });
    if (!result) return;

    result = result.get({ plain: true });
    result.category.icon = result.category.icon.url;

    return { data: result };
  },
  //MM-16
  getAll: async (user, query) => {
    const conditions = {
      [Op.or]: [{ name: { [Op.like]: `${query.q}%` } }, { arName: { [Op.like]: `${query.q}%` } }],
    };

    if (query.status) conditions["status"] = query.status;
    if (query.restaurantId) conditions["restaurantId"] = query.restaurantId;
    if (query.categoryId) conditions["categoryId"] = query.categoryId;

    const { count, rows } = await db.Dish.findAndCountAll({
      attributes: { exclude: ["restaurantId"] },
      where: conditions,
      include: [
        { attributes: { exclude: ["dishId"] }, model: db.DishImage, as: "images" },
        { model: db.Allergy, as: "allergies", through: { attributes: [] } },
      ],
      offset: Number(query.offset),
      limit: Number(query.limit),
      order: [["id", "desc"]],
      distinct: true,
    });

    return { totalCount: count, data: rows };
  },
};
