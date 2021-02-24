const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Subscription extends Model {
    static UNITS = ["days", "months", "years"];

    static associate(models) {
      this.hasMany(models.RestaurantsSubscription, { foreignKey: { name: "subscriptionId", allowNull: false } });
    }
  }

  Subscription.init(
    {
      name: { type: DataTypes.STRING(100) },
      duration: { type: DataTypes.INTEGER, allowNull: false },
      durationUnit: { type: DataTypes.ENUM(Subscription.UNITS), allowNull: false },
      price: { type: DataTypes.FLOAT, allowNull: false },
      discount: { type: DataTypes.FLOAT },
      description: { type: DataTypes.TEXT },
      arDescription: { type: DataTypes.TEXT },
    },
    {
      sequelize,
      paranoid: true,
      underscored: true,
      defaultScope: {
        attributes: { exclude: ["deletedAt"] },
      },
    }
  );

  return Subscription;
};
