const { statusCodes } = require("../../../helpers");
const sequelize = require("../../../database");

const db = sequelize.models;

module.exports = {
  delete: async (user, dishId, id) => {
    sequelize.transaction(async (transaction) => {
      await Promise.all([
        //check user permission
        db.Dish.checkPermission(user, dishId),
        db.DishImage.destroy({ where: { id }, transaction }),
      ]);
    });
  },
};
