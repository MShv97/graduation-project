const db = require("../../datebase").models;
const { JWTGenerator } = require("../../helpers");
const { compare, hash } = require("bcrypt");
const { verify } = require("jsonwebtoken");

module.exports = {
  login: async (body) => {
    const { email, password } = body;
    let user = await db.User.findOne({ where: { email: email } });
    if (!user) throw new Exception(401, "Email is invalid.");
    user = user.get({ plain: true });
    // verify password
    if (!(await compare(password, user.password))) throw new Exception(401, "Password is invalid.");
    // generate JWT tokens
    const payload = { userId: user.id, role: user.role, restaurantId: user.restaurantId };
    const data = JWTGenerator(payload);

    return { data };
  },
  refreshToken: async (body) => {
    const { userId, role, restaurantId } = verify(body.refreshToken, process.env.JWT_REFRESH_SECRET);
    const payload = { userId, role, restaurantId };
    const data = JWTGenerator(payload);
    data.role = role;
    return { data };
  },
};
