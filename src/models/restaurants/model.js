const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Restaurant extends Model {}

  Restaurant.init(
    {
      name: { type: DataTypes.STRING(100) },
      address: { type: DataTypes.STRING },
      logo: { type: DataTypes.TEXT, allowNull: true },
      image: { type: DataTypes.TEXT, allowNull: true },
    },
    {
      sequelize,
      timestamps: false,
      underscored: true,
    }
  );

  Restaurant.associate = (models) => {
    Restaurant.hasMany(models.Menu, { foreignKey: "restaurant_id" });
    Restaurant.hasMany(models.Table, { foreignKey: "restaurant_id" });
    Restaurant.hasMany(models.RestaurantSubscription, { foreignKey: "restaurant_id" });
    Restaurant.hasMany(models.User, { foreignKey: "restaurant_id" });
  };

  return Restaurant;
};
