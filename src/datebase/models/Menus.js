const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Menu extends Model {}

  Menu.init(
    {
      name: { type: DataTypes.STRING(100) },
      description: { type: DataTypes.TEXT },
      thumpnail: { type: DataTypes.TEXT, nullable: true },
    },
    {
      sequelize,
      timestamps: false,
      underscored: true,
    }
  );

  Menu.associate = (models) => {
    Menu.belongsTo(models.Restaurant, { foreignKey: { name: "restaurant_id", allowNull: false } });
    Menu.hasMany(models.Category, { foreignKey: { name: "menu_id", allowNull: false } });
  };

  return Menu;
};
