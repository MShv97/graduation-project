const { CustomError, statusCodes, DeletePublicError } = require("../helpers");
class Exception extends Error {
  constructor(status, msg = "") {
    super(msg);
    this.errCode = status;
  }

  static handler(err, req, res, next) {
    DeletePublicError(req);
    let errCode = err.errCode || statusCodes.INTERNAL_SERVER_ERROR;
    let message = err.errCode ? err.message : "Internal server error.";

    if (err.name == "SequelizeUniqueConstraintError") {
      errCode = statusCodes.DUPLICATED_ENTRY;
      message = "Conflict.";
    }

    if (err.name == "SequelizeForeignKeyConstraintError") {
      errCode = statusCodes.ITEM_NOT_FOUND;
      message = "Reference non existing data.";
    }

    if (err.name == "TokenExpiredError") {
      errCode = statusCodes.UNAUTHORIZED;
      message = "Token has been expired.";
    }

    if (err instanceof CustomError) {
      errCode = err.status;
      message = err.message;
    }

    if (err.errCode == statusCodes.ITEM_NOT_FOUND) {
      message = "Not found.";
    }

    console.log(err);
    res.status(errCode).send({ message });
  }
}

global.Exception = Exception;

module.exports = Exception;
