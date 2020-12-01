import { NextFunction, Request, Response } from "express";
import { ResponseSender } from "../helpers";
import AuthService from "../services/auth";

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body;
    //const results = await AuthService.login(body);
    //ResponseSender({ res: res, status: 200, response: results });
  } catch (err) {
    next(err);
  }
};
export default { login };
