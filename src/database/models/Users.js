const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class User extends Model {
    static ROLE = ["admin", "manager", "author", "chef", "accountant", "waiter"];

    static associate(models) {
      this.belongsTo(models.Restaurant, { foreignKey: { name: "restaurantId", allowNull: false } });
    }
  }

  User.init(
    {
      firstName: { type: DataTypes.STRING(40), allowNull: false },
      lastName: { type: DataTypes.STRING(40), allowNull: false },
      email: { type: DataTypes.STRING, unique: "user_email" },
      password: { type: DataTypes.TEXT, allowNull: false },
      phone: { type: DataTypes.STRING(20), allowNull: false },
      birthdate: { type: DataTypes.DATE, allowNull: false },
      avatar: { type: DataTypes.TEXT },
      role: { type: DataTypes.ENUM(User.ROLE), allowNull: false },
      address: { type: DataTypes.TEXT },
      verified: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      sequelize,
      underscored: true,
    }
  );

  return User;
};
