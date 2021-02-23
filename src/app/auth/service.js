const { JWTGenerator, statusCodes, mailSender, moment } = require("../../helpers");
const { compare, hash } = require("bcrypt");
const { verify } = require("jsonwebtoken");
const sequelize = require("../../database");
const { Op } = require("sequelize");
const { transaction } = require("../../database");
const { Exception } = require("../../middlewares");
const db = sequelize.models;

module.exports = {
  login: async ({ email, password }) => {
    let user = await db.User.findOne({
      attributes: { exclude: ["phone", "birthdate", "address"] },
      where: { email: email },
      include: [
        {
          as: "restaurant",
          attributes: ["name", "arName", "logo", "image"],
          model: db.Restaurant,
        },
      ],
    });
    if (!user) throw new Exception(statusCodes.INVALID_EMAIL_OR_PASSWORD);
    user = user.get({ plain: true });
    // verify password
    if (!(await compare(password, user.password))) throw new Exception(statusCodes.INVALID_EMAIL_OR_PASSWORD);
    // generate JWT tokens
    const payload = { userId: user.id, role: user.role, restaurantId: user.restaurantId };
    const result = JWTGenerator(payload);
    result.user = _.omit(user, "password");

    return result;
  },

  signup: async (body) => {
    const invite = await db.Invite.findOne({ where: { token: body.token } });
    if (!invite) throw new Exception(statusCodes.ITEM_NOT_FOUND, "Invite token was not found.");
    body.password = await hash(body.password, Number(process.env.BCRYPT_ROUNDS));
    await sequelize.transaction(async (transaction) => {
      await Promise.all([
        db.User.create({ ...body, restaurantId: invite.restaurantId, role: invite.role }, { transaction }),
        db.Invite.destroy({ where: { id: invite.id }, transaction }),
      ]);
    });
  },

  refreshToken: async (body) => {
    const { userId, role, restaurantId } = verify(body.refreshToken, process.env.JWT_REFRESH_SECRET);
    const payload = { userId, role, restaurantId };
    const result = JWTGenerator(payload);
    result.role = role;

    return result;
  },

  forgetPassword: async (body) => {
    const user = await db.User.findOne({ attributes: ["id"], where: { email: body.email } });
    if (!user) throw new Exception(statusCodes.INVALID_EMAIL_OR_PASSWORD);

    await sequelize.transaction(async (transaction) => {
      const [forgetPassword, created] = await db.ForgetPassword.findOrCreate({
        where: { userId: user.id, usedAt: { [Op.is]: null } },
        defaults: { userId: user.id, usedAt: null, expireAt: moment(new Date()).add(48, "hours") },
        transaction,
      });
      if (!created) {
        forgetPassword.expireAt = moment(new Date()).add(48, "hours");
        forgetPassword.token = require("uuid").v4();
        await forgetPassword.save({ transaction });
      }

      //await mailSender(body.email, "Reset Password", `domain.com/reset-password?token=${forgetPassword.token}`);
    });
  },

  resetPassword: async (body) => {
    const forgetPassword = await db.ForgetPassword.findOne({
      where: { token: body.token, expireAt: { [Op.gt]: new Date() }, usedAt: { [Op.is]: null } },
    });
    if (!forgetPassword) throw new Exception(statusCodes.ITEM_NOT_FOUND);

    await sequelize.transaction(async (transaction) => {
      const password = await hash(body.password, Number(process.env.BCRYPT_ROUNDS));
      forgetPassword.usedAt = new Date();
      await Promise.all([
        db.User.update({ password }, { where: { id: forgetPassword.userId }, transaction }),
        forgetPassword.save({ transaction }),
      ]);
    });
  },

  verify: async (body) => {
    const user = await db.User.findOne({ where: { verifyCode: body.code } });
    if (!user) throw new Exception(statusCodes.ITEM_NOT_FOUND);

    user.verified = true;
    await user.save();
  },
};
