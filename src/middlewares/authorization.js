const { verify } = require("jsonwebtoken");
const { statusCodes } = require("../helpers");

function checkRoles(roles, role) {
  // check if user has any of the given roles
  if (role == "admin") return true;
  if (roles.includes("any")) return true;
  if (roles.includes(role)) return true;
  return false;
}

module.exports = (roles = []) => (req, res, next) => {
  try {
    // get the authorization header from request
    const authorizationHeader = req.headers["Authorization"] || req.headers["authorization"];
    const token = authorizationHeader.split(" ")[1];

    const payload = verify(token, process.env.JWT_ACCESS_SECRET);

    const { userId, role, restaurantId } = payload;
    req.user = { userId, role, restaurantId };

    if (checkRoles(roles, role)) next();
    else throw new Exception(statusCodes.UNAUTHORIZED, "You are not allowed to do this request.");
  } catch (err) {
    if (err.name == "TokenExpiredError" || err instanceof Exception) throw err;

    throw new Exception(statusCodes.UNAUTHORIZED, "Unauthorized.");
  }
};
