const { sign } = require("jsonwebtoken");

/**
 * Json web tokens generator
 *
 * @param {object} payload
 * @returns {object} {access_token, refresh_token}
 */

module.exports = (payload) => {
  const accessToken = sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_expiresIn,
  });
  const refreshToken = sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_expiresIn,
  });
  return { accessToken, refreshToken };
};
