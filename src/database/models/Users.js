const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class User extends Model {}

  User.init(
    {
      firstName: { type: DataTypes.STRING(40) },
      lastName: { type: DataTypes.STRING(40) },
      email: { type: DataTypes.STRING, unique: true },
      password: { type: DataTypes.TEXT },
      phone: { type: DataTypes.STRING(20) },
      birthdate: { type: DataTypes.DATE },
      avatar: { type: DataTypes.TEXT, allowNull: true },
      role: { type: DataTypes.ENUM("admin", "manager", "author", "chef", "accountant", "waiter") },
    },
    {
      sequelize,
      timestamps: false,
      underscored: true,
    }
  );

  User.associate = (models) => {
    User.belongsTo(models.Restaurant, { foreignKey: { name: "restaurantId", allowNull: false } });
  };

  return User;
};
