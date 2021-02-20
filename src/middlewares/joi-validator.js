const { statusCodes } = require("../helpers");

module.exports = (schema) => {
  return (req, res, next) => {
    const validationResult = schema.unknown(true).validate(req);

    if (validationResult.error) {
      const message = validationResult.error.message.split('"').join("");
      throw new Exception(statusCodes.VALIDATION_ERROR, message);
    }
    next();
  };
};
