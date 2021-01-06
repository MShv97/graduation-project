const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Dish extends Model {}

  Dish.init(
    {
      name: { type: DataTypes.STRING(100) },
      description: { type: DataTypes.TEXT },
      code: { type: DataTypes.STRING(40) },
      price: { type: DataTypes.FLOAT },
      discount: { type: DataTypes.FLOAT, defaultValue: 0 },
      status: { type: DataTypes.ENUM("active", "disabled") },
      allergies: { type: DataTypes.TEXT },
      calories: { type: DataTypes.FLOAT },
    },
    {
      sequelize,
      timestamps: false,
      underscored: true,
    }
  );

  Dish.associate = (models) => {
    Dish.belongsTo(models.Category, { foreignKey: "category_id" });
    Dish.hasMany(models.Order, { foreignKey: "dish_id" });
    Dish.hasMany(models.DishImage, { foreignKey: "dish_id" });
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
