const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class User extends Model {
    static ROLES = ["admin", "manager", "author", "chef", "accountant", "waiter"];
    static STATUS = ["pending", "hired", "fired", "resigned"];

    static associate(models) {
      this.belongsTo(models.Restaurant, {
        as: "restaurant",
        foreignKey: { name: "restaurantId", allowNull: false },
        onDelete: "CASCADE",
      });

      this.hasMany(models.Order, { foreignKey: { name: "userId" } });
      this.hasMany(models.ForgetPassword, { foreignKey: { name: "userId", allowNull: false } });
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
      role: { type: DataTypes.ENUM(User.ROLES), allowNull: false },
      address: { type: DataTypes.TEXT },
      status: { type: DataTypes.ENUM(User.STATUS), defaultValue: "pending" },
      verified: { type: DataTypes.BOOLEAN, defaultValue: false },
      verifyCode: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
    },
    {
      sequelize,
      underscored: true,
    }
  );

  return User;
};
