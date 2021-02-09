const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Restaurant extends Model {
    static associate(models) {
      this.hasMany(models.Menu, { foreignKey: { name: "restaurantId", allowNull: false } });
      this.hasMany(models.Table, { foreignKey: { name: "restaurantId", allowNull: false } });
      this.hasMany(models.RestaurantsSubscription, { foreignKey: { name: "restaurantId", allowNull: false } });
      this.hasMany(models.User, { foreignKey: { name: "restaurantId", allowNull: false } });
      this.hasMany(models.Invite, { foreignKey: { name: "restaurantId", allowNull: false } });
      this.hasMany(models.Dish, { foreignKey: { name: "restaurantId", allowNull: false } });
    }
  }

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

  return Restaurant;
};
