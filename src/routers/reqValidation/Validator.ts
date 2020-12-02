import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import { ResponseSender } from "../../helpers";

const validator = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const validationResult = schema.unknown(true).validate(req);
    if (validationResult.error) {
      ResponseSender({ res: res, status: 400, response: { message: validationResult.error.message } });
      return;
    }
    next();
  };
};

export default validator;
