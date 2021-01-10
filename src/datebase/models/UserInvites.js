const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Invite extends Model {}

  Invite.init(
    {
      token: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
      to: { type: DataTypes.STRING },
      role: { type: DataTypes.ENUM("admin", "accountant", "waiter", "chief", "author") },
    },
    {
      sequelize,
      updatedAt: false,
      underscored: true,
    }
  );

  Invite.associate = (models) => {
    Invite.belongsTo(models.Restaurant, { foreignKey: { name: "restaurantId", allowNull: false } });
  };

  return Invite;
};
