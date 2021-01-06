const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class RestaurantSubscription extends Model {}

  RestaurantSubscription.init(
    {
      status: { type: DataTypes.ENUM("pending") },
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

  RestaurantSubscription.associate = (models) => {
    RestaurantSubscription.belongsTo(models.Subscription, { foreignKey: "subscription_id" });
    RestaurantSubscription.belongsTo(models.Restaurant, { foreignKey: "restaurant_id" });
    RestaurantSubscription.belongsTo(models.PaymentMethod, { foreignKey: "payment_method_id" });
  };

  return RestaurantSubscription;
};
