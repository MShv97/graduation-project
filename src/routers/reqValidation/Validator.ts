import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import { CustomError, ResponseSender } from "../../helpers";

const validator = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const validationResult = schema.unknown(true).validate(req);
    if (validationResult.error) {
      next(new CustomError({ status: 400, message: validationResult.error.message }));
      return;
    }
    next();
  };
};

export default validator;
