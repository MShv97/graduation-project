const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Alergy extends Model {}

  Alergy.init(
    {
      kind: { type: DataTypes.STRING },
    },
    {
      sequelize,
      timestamps: false,
      underscored: true,
    }
  );

  Alergy.associate = (models) => {
    Alergy.belongsToMany(models.Dish, { foreignKey: { name: "alergyId", allowNull: false } });
  };

  return Alergy;
};
