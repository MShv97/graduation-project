const { logger, DeletePublicError, CustomError, ResponseSender } = require("../helpers");

const reqLogger = (req, res, next) => {
  logger.info(req.originalUrl);
  next();
};

const errorLogger = (err, req, res, next) => {
  console.log(err);
  DeletePublicError(req);
  if (err instanceof CustomError) {
    ResponseSender({ res: res, status: err.status, response: { message: err.message } });
    logger.error(err.message);
  } else {
    ResponseSender({ res: res, status: 500, response: { message: "Internal server error." } });
    logger.error(err);
  }
  next();
};

module.exports = { reqLogger, errorLogger };
