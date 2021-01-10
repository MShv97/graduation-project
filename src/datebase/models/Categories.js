const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Category extends Model {
    static async checkPermission(user, id) {
      const db = sequelize.models;
      const category = await this.findOne({
        attributes: ["id"],
        where: { id },
        include: [
          {
            required: true,
            attributes: [],
            model: db.Menu,
            where: { restaurantId: user.restaurantId } 
          },
        ],
      });
      if (!category) throw new Exception(statusCodes.ITEM_NOT_FOUND, "Not Found");
    }
  }

  Category.init(
    {
      name: { type: DataTypes.STRING(100) },
      description: { type: DataTypes.TEXT },
      thumpnail: { type: DataTypes.TEXT, nullable: true },
    },
    {
      sequelize,
      timestamps: false,
      underscored: true,
    }
  );

  Category.associate = (models) => {
    Category.belongsTo(models.Menu, { foreignKey: { name: "menuId", allowNull: false } });
    Category.hasMany(models.Dish, { foreignKey: { name: "categoryId", allowNull: false } });
  };

  return Category;
};
