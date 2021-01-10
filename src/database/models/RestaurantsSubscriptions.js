const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class RestaurantsSubscription extends Model {}

  RestaurantsSubscription.init(
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

  RestaurantsSubscription.associate = (models) => {
    RestaurantsSubscription.belongsTo(models.Subscription, { foreignKey: { name: "subscriptionId", allowNull: false } });
    RestaurantsSubscription.belongsTo(models.Restaurant, { foreignKey: { name: "restaurantId", allowNull: false } });
    RestaurantsSubscription.belongsTo(models.PaymentMethod, { foreignKey: { name: "paymentMethodId", allowNull: false } });
  };

  return RestaurantsSubscription;
};
