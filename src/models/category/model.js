const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Category extends Model {}

  Category.init(
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

  Category.associate = (models) => {
    Category.belongsTo(models.Menu, { foreignKey: "menu_id" });
    Category.hasMany(models.Dish, { foreignKey: "category_id" });
  };

  return Category;
};
