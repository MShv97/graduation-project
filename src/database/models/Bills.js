const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Bill extends Model {
    static associate(models) {
      // Bill.hasOne(models.Client, { foreignKey: "clientId" });
    }
  }

  Bill.init(
    {
      checkout: { type: DataTypes.DATE(6) },
    },
    {
      sequelize,
      timestamps: false,
      underscored: true,
    }
  );

  return Bill;
};
