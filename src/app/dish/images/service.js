const db = require("../../../database").models;
const { statusCodes } = require("../../../helpers");

module.exports = {
  delete: async (user, dishId, id) => {
    //check user premission
    await db.Dish.checkPermission(user, dishId);
    await db.DishImage.destroy({ where: { id } });
    //delete files
  },
};
