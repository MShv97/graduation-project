import { NextFunction, Request, Response } from "express";
import { ResponseSender } from "../helpers";
import AuthService from "../services/auth";

//MM-3
const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body;
    const results = await AuthService.login(body);
    ResponseSender({ res: res, status: 200, response: results });
  } catch (err) {
    next(err);
  }
};

//MM-3
const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body;
    const results = await AuthService.signup(body);
    ResponseSender({ res: res, status: 200, response: results });
  } catch (err) {
    next(err);
  }
};

//MM-3
const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body;
    const results = await AuthService.refreshToken(body);
    ResponseSender({ res: res, status: 200, response: results });
  } catch (err) {
    next(err);
  }
};

export default { login, signup, refreshToken };
