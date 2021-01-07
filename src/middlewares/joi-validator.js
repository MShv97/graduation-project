const { statusCodes } = require("../helpers");

module.exports = (schema) => {
  return (req, res, next) => {
    const validationResult = schema.unknown(true).validate(req);

    if (validationResult.error) throw new Exception(statusCodes.VALIDATION_ERROR, validationResult.error.message);
    next();
  };
};
