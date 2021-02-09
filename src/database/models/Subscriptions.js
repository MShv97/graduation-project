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
      price: { type: DataTypes.FLOAT },
      tables: { type: DataTypes.INTEGER },
    },
    {
      sequelize,
      timestamps: false,
      underscored: true,
    }
  );

  return Subscription;
};
