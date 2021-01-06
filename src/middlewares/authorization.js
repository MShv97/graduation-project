const { verify } = require("jsonwebtoken");
const { ResponseSender } = require("../helpers");

module.exports = async (req, res, next) => {
  // get the authorization header from request
  const authorizationHeader = req.headers["Authorization"] || req.headers["authorization"];
  try {
    const token = authorizationHeader.split(" ")[1];

    const payload = verify(token, process.env.JWT_ACCESS_SECRET);

    const { userId, role, restaurantId } = payload;
    req.user = { userId, role, restaurantId };
  } catch (err) {
    if (err.name == "TokenExpiredError") {
      ResponseSender({ res: res, status: 401, response: "Token has been expired" });
      return;
    }

    ResponseSender({ res: res, status: 401, response: "You are not logged in." });
    return;
  }

  next();
};
