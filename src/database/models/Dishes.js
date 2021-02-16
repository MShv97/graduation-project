const { Model, DataTypes } = require("sequelize");
const { statusCodes } = require("../../helpers");

module.exports = (sequelize) => {
  class Dish extends Model {
    static STATUS = ["active", "disabled"];

    static associate(models) {
      this.belongsTo(models.Category, {
        as: "category",
        foreignKey: { name: "categoryId", allowNull: false },
        onDelete: "CASCADE",
      });
      this.belongsTo(models.Restaurant, { foreignKey: { name: "restaurantId", allowNull: false }, onDelete: "CASCADE" });
      this.belongsToMany(models.Allergy, { through: "dishes_allergies", as: "allergies", timestamps: false });

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
            attributes: ["id"],
            model: db.Allergy,
            as: "allergies",
          },
          {
            required: true,
            attributes: [],
            model: db.Category,
            as: "category",
            include: [{ attributes: [], model: db.Menu, where: { restaurantId: user.restaurantId } }],
          },
        ],
        transaction,
      });
      if (!dish) throw new Exception(statusCodes.ITEM_NOT_FOUND, "Not Found");
      return dish;
    }
  }

  Dish.init(
    {
      name: { type: DataTypes.STRING(100), allowNull: false },
      arName: { type: DataTypes.STRING(100), allowNull: false },
      description: { type: DataTypes.TEXT, defaultValue: "" },
      arDescription: { type: DataTypes.TEXT, defaultValue: "" },
      code: { type: DataTypes.STRING(40) },
      price: { type: DataTypes.FLOAT, allowNull: false },
      discount: { type: DataTypes.FLOAT, defaultValue: 0 },
      status: { type: DataTypes.ENUM(Dish.STATUS), defaultValue: "active" },
      calories: { type: DataTypes.INTEGER },
      preparationTime: { type: DataTypes.SMALLINT },
    },
    {
      sequelize,
      underscored: true,
      paranoid: true,
      defaultScope: {
        attributes: { exclude: ["deletedAt"] },
      },
    }
  );

  return Dish;
};
