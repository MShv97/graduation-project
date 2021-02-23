const { Instance } = require("chalk");
const { Model, DataTypes } = require("sequelize");
const { statusCodes } = require("../../helpers");

module.exports = (sequelize) => {
  class Category extends Model {
    static STATUS = ["visible", "hidden"];

    static associate(models) {
      this.belongsTo(models.Menu, { foreignKey: { name: "menuId", allowNull: false }, onDelete: "CASCADE" });
      this.belongsTo(models.CategoryIcon, { as: "icon", foreignKey: { name: "iconId" }, onDelete: "SET NULL" });

      this.hasMany(models.Dish, { foreignKey: { name: "categoryId", allowNull: false }, onDelete: "CASCADE" });
    }

    static async checkPermission(user, id) {
      const db = sequelize.models;
      const category = await this.findOne({
        attributes: ["id"],
        where: { id },
        include: [{ required: true, attributes: [], model: db.Menu, where: { restaurantId: user.restaurantId } }],
      });
      if (!category) throw new Exception(statusCodes.ITEM_NOT_FOUND, "Not Found");
    }
  }

  Category.init(
    {
      title: { type: DataTypes.STRING(100), allowNull: false },
      arTitle: { type: DataTypes.STRING(100), allowNull: false },
      status: { type: DataTypes.ENUM(Category.STATUS), defaultValue: "visible" },
    },
    {
      sequelize,
      underscored: true,
      paranoid: true,
    }
  );

  return Category;
};
