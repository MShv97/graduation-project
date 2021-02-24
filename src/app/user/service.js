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
  update: async (id, user, body) => {
    await db.User.update(body, { where: { id, restaurantId: user.userId } });
  },
  getAll: async (user, query) => {
    const conditions = {
      restaurantId: user.restaurantId,
      [Op.or]: [{ firstName: { [Op.like]: `${query.q}%` } }, { lastName: { [Op.like]: `${query.q}%` } }],
    };
    if (query.role) conditions.role = query.role;
    let { count, rows } = await db.User.findAndCountAll({
      attributes: { exclude: ["password", "verifyCode", "updatedAt", "restaurantId"] },
      where: conditions,
      offset: Number(query.offset),
      limit: Number(query.limit),
      order: [["id", "asc"]],
      distinct: true,
    });
    return { totalCount: count, data: rows };
  },
  getById: async (user, id) => {
    const result = await db.User.findOne({
      attributes: { exclude: ["id", "password", "verifyCode", "updatedAt", "restaurantId"] },
      where: { id, restaurantId: user.restaurantId },
    });
    return { data: result };
  },
  getProfile: async (user) => {
    const result = await db.User.findOne({
      attributes: { exclude: ["id", "password", "verifyCode", "restaurantId"] },
      where: { id: user.userId },
    });
    return { data: result };
  },
  updateProfile: async (user, body, file) => {
    const query = {
      ...body,
    };
    if (file) query.avatar = file.path.replace("src\\assets\\", "");
    await db.User.update(query, { where: { id: user.userId } });
  },
  deleteImage: async (user) => {
    await db.User.update({ avatar: null }, { where: { id: user.userId } });
  },
};
