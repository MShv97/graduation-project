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
      firstName: { type: DataTypes.STRING(40) },
      lastName: { type: DataTypes.STRING(40) },
      email: { type: DataTypes.STRING, unique: "user_email" },
      password: { type: DataTypes.TEXT },
      phone: { type: DataTypes.STRING(20) },
      birthdate: { type: DataTypes.DATE },
      avatar: { type: DataTypes.TEXT, allowNull: true },
      role: { type: DataTypes.ENUM(User.ROLE) },
      address: { type: DataTypes.TEXT },
    },
    {
      sequelize,
      timestamps: false,
      underscored: true,
    }
  );

  return User;
};
