const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Table extends Model {
    static STATUS = ["active", "busy", "out of service"];

    static associate(models) {
      this.hasMany(models.Client, { foreignKey: { name: "tableId", allowNull: false } });

      this.belongsTo(models.Restaurant, { as: "Restaurant", foreignKey: { name: "restaurantId", allowNull: false } });
      this.belongsTo(models.Menu, { as: "Menu", foreignKey: { name: "menuId", allowNull: false } });
    }
  }
  Table.init(
    {
      code: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
      number: { type: DataTypes.SMALLINT, allowNull: false },
      status: { type: DataTypes.ENUM(Table.STATUS), defaultValue: "active" },
    },
    {
      indexes: [{ unique: true, fields: ["restaurant_id", "code"] }],
      sequelize,
      timestamps: false,
      underscored: true,
    }
  );

  return Table;
};
//@Unique(["code", "restaurant"])
