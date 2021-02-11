const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class CategoryIcon extends Model {
    static associate(models) {
      this.hasMany(models.Category, { foreignKey: { name: "iconId", allowNull: false } });
    }
  }

  CategoryIcon.init(
    {
      name: { type: DataTypes.STRING(40) },
      url: { type: DataTypes.TEXT },
    },
    {
      sequelize,
      timestamps: false,
      underscored: true,
    }
  );

  return CategoryIcon;
};
