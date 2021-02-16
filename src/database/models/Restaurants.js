const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Restaurant extends Model {
    static associate(models) {
      this.hasMany(models.Menu, { as: "menus", foreignKey: { name: "restaurantId", allowNull: false }, onDelete: "CASCADE" });
      this.hasMany(models.Table, { as: "tables", foreignKey: { name: "restaurantId", allowNull: false }, onDelete: "CASCADE" });
      this.hasMany(models.RestaurantsSubscription, {
        foreignKey: { name: "restaurantId", allowNull: false },
        onDelete: "CASCADE",
      });
      this.hasMany(models.User, { as: "users", foreignKey: { name: "restaurantId", allowNull: false }, onDelete: "CASCADE" });
      this.hasMany(models.Invite, { as: "invites", foreignKey: { name: "restaurantId", allowNull: false }, onDelete: "CASCADE" });
      this.hasMany(models.Dish, { as: "dishes", foreignKey: { name: "restaurantId", allowNull: false }, onDelete: "CASCADE" });
    }
  }

  Restaurant.init(
    {
      name: { type: DataTypes.STRING(100) },
      arName: { type: DataTypes.STRING(100) },
      address: { type: DataTypes.STRING },
      logo: { type: DataTypes.TEXT, allowNull: true },
      image: { type: DataTypes.TEXT, allowNull: true },
    },
    {
      sequelize,
      paranoid: true,
      underscored: true,
    }
  );

  return Restaurant;
};
