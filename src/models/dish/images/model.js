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
    DishImage.belongsTo(models.Dish, { foreignKey: "dish_id" });
  };

  return DishImage;
};

// //MM-10
// //Listener to check number of dish images allowed per dish
// @BeforeInsert()
// async CountDishImages() {
//   const count = await getRepository(DishImage).count({ where: { dish: this.dish } });
//   if (count >= 4) {
//     fs.existsSync(this.path) && fs.unlinkSync(this.path);
//     throw new CustomError({ status: 409, message: "It is not allowed to add more than 4 images per dish." });
//   }
