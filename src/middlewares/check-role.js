/**
 * Check user role permission
 *
 * @param {Array<string>} roles
 *
 * @returns {void}
 */

module.exports = (roles) => {
  return async (req, res, next) => {
    // get the user  req
    const { user } = req;
    // check if has any of the given roles
    if (roles.indexOf(user.role) > -1) next();
    else
      res.status(401).send({
        message: "You are not allowed to do this request.",
      });
  };
};
