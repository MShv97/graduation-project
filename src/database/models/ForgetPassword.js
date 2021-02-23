const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class ForgetPassword extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: { name: "userId", allowNull: false } });
    }
  }

  ForgetPassword.init(
    {
      token: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
      usedAt: { type: DataTypes.DATE },
      expireAt: { type: DataTypes.DATE, allowNull: false },
    },
    {
      sequelize,
      timestamps: false,
      underscored: true,
    }
  );

  return ForgetPassword;
};
