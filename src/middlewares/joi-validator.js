const { CustomError } = require("../helpers");

module.exports = (schema) => {
  return (req, res, next) => {
    const validationResult = schema.unknown(true).validate(req);
    if (validationResult.error) {
      next(new CustomError({ status: 400, message: validationResult.error.message }));
      return;
    }
    next();
  };
};
