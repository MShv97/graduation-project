const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Subscription extends Model {
    static associate(models) {
      this.hasMany(models.RestaurantsSubscription, { foreignKey: { name: "subscriptionId", allowNull: false } });
    }
  }

  Subscription.init(
    {
      name: { type: DataTypes.STRING(100) },
      duration: { type: DataTypes.INTEGER },
      price: { type: DataTypes.FLOAT },
      discount: { type: DataTypes.INTEGER, allowNull: true },
      description: { type: DataTypes.TEXT },
      arDescription: { type: DataTypes.TEXT },
    },
    {
      sequelize,
      timestamps: true,
      underscored: true,
    }
  );

  return Subscription;
};
