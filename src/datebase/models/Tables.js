const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Table extends Model {}

  Table.init(
    {
      code: { type: DataTypes.STRING },
      QR: { type: DataTypes.TEXT, allowNull: true },
      status: { type: DataTypes.ENUM("busy", "active", "out of service"), allowNull: true },
      image: { type: DataTypes.TEXT, allowNull: true },
    },
    {
      sequelize,
      timestamps: false,
      underscored: true,
    }
  );

  Table.associate = (models) => {
    Table.hasMany(models.Client, { foreignKey: { name: "tableId", allowNull: false } });
    Table.belongsTo(models.Restaurant, { foreignKey: { name: "restaurantId", allowNull: false } });
  };

  return Table;
};
//@Unique(["code", "restaurant"])
