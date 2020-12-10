import { NextFunction, Request, Response } from "express";
import { ResponseSender } from "../helpers";
import RestaurantService from "../services/restaurant";

//MM-6
const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body;
    const results = await RestaurantService.login(body);
    ResponseSender({ res: res, status: 200, response: results });
  } catch (err) {
    next(err);
  }
};

//MM-6
const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body;
    const results = await RestaurantService.signup(body);
    ResponseSender({ res: res, status: 200, response: results });
  } catch (err) {
    next(err);
  }
};

export default { login, signup };
