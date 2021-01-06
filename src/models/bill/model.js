const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Bill extends Model {}

  Bill.init(
    {
      chekout: { type: DataTypes.DATE },
    },
    {
      sequelize,
      timestamps: false,
      underscored: true,
    }
  );

  Bill.associate = (models) => {
    Bill.hasOne(models.Client, { foreignKey: "client_id" });
  };

  return Bill;
};
