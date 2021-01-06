const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class PaymentMethod extends Model {}

  PaymentMethod.init(
    {
      name: { type: DataTypes.STRING(100) },
      icon: { type: DataTypes.TEXT },
    },
    {
      sequelize,
      timestamps: false,
      underscored: true,
    }
  );

  PaymentMethod.associate = (models) => {};

  return PaymentMethod;
};
