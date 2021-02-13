const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Client extends Model {
    static associate(models) {
      this.belongsTo(models.Table, { foreignKey: { name: "tableId", allowNull: false } });

      this.hasMany(models.Order, { foreignKey: { name: "clientId", allowNull: false } });
      this.hasOne(models.Bill, { foreignKey: { name: "clientId", allowNull: false } });
    }
  }

  Client.init(
    {
      name: { type: DataTypes.STRING(60) },
      phone: { type: DataTypes.STRING(20) },
      order_date: { type: DataTypes.DATE, defaultValue: new Date() },
    },
    {
      sequelize,
      timestamps: false,
      underscored: true,
    }
  );

  return Client;
};
