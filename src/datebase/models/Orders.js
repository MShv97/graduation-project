const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Order extends Model {}

  Order.init(
    {
      amount: { type: DataTypes.INTEGER },
      note: { type: DataTypes.TEXT },
      status: { type: DataTypes.ENUM("pending", "ready"), nullable: true },
    },
    {
      sequelize,
      timestamps: false,
      underscored: true,
    }
  );

  Order.associate = (models) => {
    Order.belongsTo(models.Client, { foreignKey: { name: "clintId", allowNull: false } });
    Order.belongsTo(models.Dish, { foreignKey: { name: "dishId", allowNull: false } });
  };

  return Order;
};
