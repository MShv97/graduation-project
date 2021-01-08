const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Bill extends Model {}

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

  Bill.associate = (models) => {
    // Bill.hasOne(models.Client, { foreignKey: "clientId" });
  };

  return Bill;
};
