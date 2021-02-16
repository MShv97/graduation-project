const db = require("../../database").models;
const { JWTGenerator } = require("../../helpers");
const { compare, hash } = require("bcrypt");
const { verify } = require("jsonwebtoken");

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
    if (!user) throw new Exception(401, "Email is invalid.");
    user = user.get({ plain: true });
    // verify password
    if (!(await compare(password, user.password))) throw new Exception(401, "Password is invalid.");
    // generate JWT tokens
    const payload = { userId: user.id, role: user.role, restaurantId: user.restaurantId };
    const result = JWTGenerator(payload);
    result.user = _.omit(user, "password");

    return result;
  },
  refreshToken: async (body) => {
    const { userId, role, restaurantId } = verify(body.refreshToken, process.env.JWT_REFRESH_SECRET);
    const payload = { userId, role, restaurantId };
    const result = JWTGenerator(payload);
    result.role = role;

    return result;
  },
};
