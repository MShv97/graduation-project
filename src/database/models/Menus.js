const { Model, DataTypes } = require("sequelize");
const { statusCodes } = require("../../helpers");

module.exports = (sequelize) => {
  class Menu extends Model {
    static associate(models) {
      this.belongsTo(models.Restaurant, { foreignKey: { name: "restaurantId", allowNull: false }, onDelete: "CASCADE" });
      this.hasMany(models.Category, { as: "categories", foreignKey: { name: "menuId", allowNull: false }, onDelete: "CASCADE" });
    }

    static async checkPermission(user, id) {
      const Menu = await this.findOne({
        attributes: ["id"],
        where: { id, restaurantId: user.restaurantId },
        transaction,
      });
      if (!Menu) throw new Exception(statusCodes.ITEM_NOT_FOUND, "Not Found");
    }
  }

  Menu.init(
    {
      title: { type: DataTypes.STRING(100), allowNull: false },
      arTitle: { type: DataTypes.STRING(100), allowNull: false },
      currency: { type: DataTypes.STRING(10), allowNull: false },
      image: { type: DataTypes.TEXT },
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

  return Menu;
};
