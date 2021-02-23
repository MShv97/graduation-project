const sequelize = require("../../database");
const { statusCodes, mailSender } = require("../../helpers");
const { Op } = require("sequelize");
const { hash } = require("bcrypt");

const db = sequelize.models;

module.exports = {
  //MM-18
  invite: async (user, body) => {
    const restaurant = await db.Restaurant.findOne({ attributes: ["id", "name"], where: { id: user.restaurantId } });
    let { role, to, subject, text, html } = body;
    await sequelize.transaction(async (transaction) => {
      const invite = await db.Invite.create({ to, role, restaurantId: restaurant.id }, { transaction });
      subject = `Work invitation in "${restaurant.name}"`;
      html = `You have been invited to join "${restaurant.name}" team as "${role}".<br /><a href="https://mymenusystem.herokuapp.com/invite?token=${invite.token}">Click here to accept.</a>`;
      await mailSender(to, subject, text, html);
    });
  },
};
