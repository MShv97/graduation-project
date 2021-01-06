const { sign } = require("jsonwebtoken");

/**
 * Json web tokens generator
 *
 * @param {object} payload
 * @returns {object} {access_token, refresh_token}
 */

module.exports = (payload) => {
  const access_token = sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_expiresIn,
  });
  const refresh_token = sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_expiresIn,
  });
  return { access_token, refresh_token };
};
