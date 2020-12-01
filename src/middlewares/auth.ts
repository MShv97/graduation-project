import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { ResponseSender } from "../helpers";

export class userReq {
  userId: any;
  type: any;
}
// add currUser to the request interface
declare module "express-serve-static-core" {
  interface Request {
    currUser?: userReq;
  }
  interface Response {
    currUser?: userReq;
  }
}
export default async (req: Request, res: Response, next: NextFunction) => {
  // get the authorization header from request
  const authorizationHeader: string = <string>req.headers["Authorization"];
  try {
    const token = authorizationHeader.split(" ")[1];

    const payload = <any>verify(token, process.env.JWT_ACCESS_SECRET);

    const { userId, type } = payload;
    req.currUser = { userId, type };
  } catch (err) {
    if (err.name == "TokenExpiredError") {
      ResponseSender({ res: res, status: 401, response: "Token has been expired" });
      return;
    }

    ResponseSender({ res: res, status: 401, response: "You are not logged in." });
    return;
  }

  next();
};
