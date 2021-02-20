const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class DishImage extends Model {}

  DishImage.init(
    {
      path: { type: DataTypes.TEXT },
    },
    {
      sequelize,
      timestamps: false,
      underscored: true,
    }
  );

  DishImage.associate = (models) => {
    DishImage.belongsTo(models.Dish, { foreignKey: { name: "dishId", allowNull: false } });
  };

  return DishImage;
};
