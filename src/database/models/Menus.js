const { Model, DataTypes } = require("sequelize");
const { statusCodes } = require("../../helpers");

module.exports = (sequelize) => {
  class Menu extends Model {
    static associate(models) {
      this.belongsTo(models.Restaurant, { foreignKey: { name: "restaurantId", allowNull: false } });
      this.hasMany(models.Category, { foreignKey: { name: "menuId", allowNull: false } });
    }

    static async checkPermission(user, id) {
      const Menu = await this.findOne({
        attributes: ["id"],
        where: { id, restaurantId: user.restaurantId },
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
      timestamps: false,
      underscored: true,
    }
  );

  return Menu;
};
