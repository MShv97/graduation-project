const { statusCodes, DeletePublicError, logger } = require("../helpers");
class Exception {
  constructor(status, msg, error) {
    this.errCode = status;
    this.message = msg;
    this.error = error;
  }

  static handler(err, req, res, next) {
    DeletePublicError(req);
    let errCode = err.errCode || statusCodes.INTERNAL_SERVER_ERROR;
    let message = err.errCode ? err.message : "Internal server error.";
    let error = err.error;

    if (err.name == "SequelizeUniqueConstraintError") {
      errCode = statusCodes.DUPLICATED_ENTRY;
      message = "Conflict.";
    }

    if (err.name == "SequelizeForeignKeyConstraintError") {
      errCode = statusCodes.ITEM_NOT_FOUND;
      message = "Reference non existing data.";
    }

    if (err.name == "TokenExpiredError") {
      errCode = statusCodes.TOKEN_EXPIRED;
      message = "Token has been expired.";
    }

    if (err.errCode == statusCodes.ITEM_NOT_FOUND && !message) {
      message = "Not found.";
    }

    if (errCode == 500) logger.error(err);
    res.status(errCode).send({ code: errCode, message, error });
  }
}

global.Exception = Exception;

module.exports = Exception;
