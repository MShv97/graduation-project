const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Client extends Model {}

  Client.init(
    {
      name: { type: DataTypes.STRING(60) },
      phone: { type: DataTypes.STRING(20) },
      order_date: { type: DataTypes.DATE },
    },
    {
      sequelize,
      timestamps: false,
      underscored: true,
    }
  );

  Client.associate = (models) => {
    Client.belongsTo(models.Table, { foreignKey: "table_id" });
    Client.hasMany(models.Order, { foreignKey: "client_id" });
    Client.hasOne(models.Bill, { foreignKey: "client_id" });
  };

  return Client;
};
