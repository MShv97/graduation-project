const { hash } = require("bcrypt");
const sequelize = require("../../database");
const { statusCodes } = require("../../helpers");
const { Op } = require("sequelize");

const db = sequelize.models;

module.exports = {
  //MM-18
  signup: async (body) => {
    await sequelize.transaction(async (trx) => {
      const restaurant = await db.Restaurant.create({ name: body.name, address: body.address }, { transaction: trx });
      body.password = await hash(body.password, Number(process.env.BCRYPT_ROUNDS));
      await db.User.create(
        {
          restaurantId: restaurant.id,
          firstName: body.firstName,
          lastName: body.lastName,
          email: body.email,
          phone: body.phone,
          password: body.password,
          role: "restaurant",
          birthdate: body.birthdate,
        },
        { transaction: trx }
      );
    });
  },
};
