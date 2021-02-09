const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class RestaurantsSubscription extends Model {
    static STATUS = ["pending"];

    static associate(models) {
      this.belongsTo(models.Subscription, { foreignKey: { name: "subscriptionId", allowNull: false } });
      this.belongsTo(models.Restaurant, { foreignKey: { name: "restaurantId", allowNull: false } });
      this.belongsTo(models.PaymentMethod, { foreignKey: { name: "paymentMethodId", allowNull: false } });
    }
  }

  RestaurantsSubscription.init(
    {
      status: { type: DataTypes.ENUM(RestaurantsSubscription.STATUS) },
    },
    {
      sequelize,
      timestamps: false,
      underscored: true,
    }
  );

  return RestaurantsSubscription;
};
