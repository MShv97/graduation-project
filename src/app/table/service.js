const sequelize = require("../../database");
const { statusCodes } = require("../../helpers");
const { Op } = require("sequelize");
const QRCode = require("qrcode");
const fs = require("fs");

const db = sequelize.models;

module.exports = {
  //MM-22
  create: async (user, body) => {
    fs.mkdirSync("src/public/tables", { recursive: true });

    const tables = [];
    for (let i = 0; i < body.count; i++) {
      const table = db.Table.build({ restaurantId: user.restaurantId }).get({ plain: true });

      const path = `src/public/tables/${Date.now()}.svg`;
      await QRCode.toFile(path, `https://mymenusystem.herokuapp.com/table?code=${table.code}`);
      table.QR = path;

      tables.push(table);
    }

    await db.Table.bulkCreate(tables);
  },
  //MM-22
  menu: async (query) => {
    const result = await db.Table.findAll({
      require: true,
      attributes: [],
      where: { code: query.code },
      include: [
        {
          attributes: ["id"],
          model: db.Restaurant,
          include: [{ attributes: { exclude: ["restaurantId"] }, model: db.Menu }],
        },
      ],
    });

    return { data: result[0].Restaurant.Menus };
  },
};
