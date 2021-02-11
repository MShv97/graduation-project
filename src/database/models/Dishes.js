const { Model, DataTypes } = require("sequelize");
const { statusCodes } = require("../../helpers");

module.exports = (sequelize) => {
  class Dish extends Model {
    static STATUS = ["active", "disabled"];

    static associate(models) {
      this.belongsTo(models.Category, { foreignKey: { name: "categoryId", allowNull: false } });
      this.belongsTo(models.Restaurant, { foreignKey: { name: "restaurantId", allowNull: false } });

      this.hasMany(models.Order, { foreignKey: { name: "dishId", allowNull: false } });
      this.hasMany(models.DishImage, { as: "images", foreignKey: { name: "dishId", allowNull: false } });
    }

    static async checkPermission(user, id) {
      const db = sequelize.models;
      const dish = await this.findOne({
        attributes: ["id"],
        where: { id },
        include: [
          {
            required: true,
            attributes: [],
            model: db.Category,
            include: [{ attributes: [], model: db.Menu, where: { restaurantId: user.restaurantId } }],
          },
        ],
      });
      if (!dish) throw new Exception(statusCodes.ITEM_NOT_FOUND, "Not Found");
    }
  }

  Dish.init(
    {
      name: { type: DataTypes.STRING(100), allowNull: false },
      description: { type: DataTypes.TEXT, defaultValue: "" },
      code: { type: DataTypes.STRING(40) },
      price: { type: DataTypes.FLOAT, allowNull: false },
      discount: { type: DataTypes.FLOAT, defaultValue: 0 },
      status: { type: DataTypes.ENUM(Dish.STATUS), defaultValue: "active" },
      calories: { type: DataTypes.FLOAT },
      PreparationTime: { type: DataTypes.FLOAT },
    },
    {
      sequelize,
      timestamps: false,
      underscored: true,
    }
  );
  Dish.associate = (models) => {
    Dish.belongsToMany(models.Alergy, { foreignKey: { name: "dishId", allowNull: false } });
  };

  return Dish;
};
//MM-10
//Listener to delete dish images from local storage before deleting dish
//Dish images is being deleted with cascade option
// @BeforeRemove()
// DeleteImagesFiles() {
//   for (const image of this.images) fs.existsSync(image.path) && fs.unlinkSync(image.path);
// }
