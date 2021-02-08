const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Table extends Model {}

  Table.init(
    {
      code: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
      QR: { type: DataTypes.TEXT, allowNull: true },
      status: { type: DataTypes.ENUM("active", "busy", "out of service"), defaultValue: "active" },
    },
    {
      indexes: [{ unique: true, fields: ["restaurant_id", "code"] }],
      sequelize,
      timestamps: false,
      underscored: true,
    }
  );

  Table.associate = (models) => {
    Table.hasMany(models.Client, { foreignKey: { name: "tableId", allowNull: false } });

    Table.belongsTo(models.Restaurant, { foreignKey: { name: "restaurantId", allowNull: false } });
    Table.belongsTo(models.Menu, { foreignKey: { name: "menuId", allowNull: false } });
  };

  return Table;
};
//@Unique(["code", "restaurant"])
