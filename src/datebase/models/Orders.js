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
    Order.belongsTo(models.Client, { foreignKey: { name: "clint_id", allowNull: false } });
    Order.belongsTo(models.Dish, { foreignKey: { name: "dish_id", allowNull: false } });
  };

  return Order;
};
