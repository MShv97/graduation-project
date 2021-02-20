/*
 * http request logger
 */
module.exports = (req, res, next) => {
  logger.info(req.originalUrl);
  next();
};
