const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Allergy extends Model {
    static associate(models) {
      this.belongsToMany(models.Dish, { through: "Dish_Allergy", timestamps: false });
    }
  }

  Allergy.init(
    {
      name: { type: DataTypes.STRING(40) },
      arName: { type: DataTypes.STRING(40) },
    },
    {
      sequelize,
      timestamps: false,
      underscored: true,
    }
  );

  return Allergy;
};
