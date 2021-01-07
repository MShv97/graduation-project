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
    Restaurant.hasMany(models.Menu, { foreignKey: { name: "restaurant_id", allowNull: false } });
    Restaurant.hasMany(models.Table, { foreignKey: { name: "restaurant_id", allowNull: false } });
    Restaurant.hasMany(models.RestaurantsSubscription, { foreignKey: { name: "restaurant_id", allowNull: false } });
    Restaurant.hasMany(models.User, { foreignKey: { name: "restaurant_id", allowNull: false } });
  };

  return Restaurant;
};
