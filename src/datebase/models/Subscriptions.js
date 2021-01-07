const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Subscription extends Model {}

  Subscription.init(
    {
      name: { type: DataTypes.STRING(100) },
      price: { type: DataTypes.FLOAT },
      tables: { type: DataTypes.INTEGER },
    },
    {
      sequelize,
      timestamps: false,
      underscored: true,
    }
  );

  Subscription.associate = (models) => {
    Subscription.hasMany(models.RestaurantsSubscription, { foreignKey: { name: "subscription_id", allowNull: false } });
  };

  return Subscription;
};