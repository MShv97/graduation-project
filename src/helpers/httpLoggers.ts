import { Response, Request, NextFunction } from "express";
import { logger } from "../helpers";
import { CustomError, ResponseSender } from "./index";

const reqLogger = (req: Request, res: Response, next: NextFunction) => {
  logger.info(req.originalUrl);
  next();
};

const errorLogger = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    ResponseSender({ res: res, status: err.status, response: { message: err.message } });
    logger.error(err.message);
  } else {
    ResponseSender({ res: res, status: 500, response: { message: "Internal server error." } });
    logger.error(err);
  }
  next();
};

export { reqLogger, errorLogger };
