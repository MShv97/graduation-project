import { NextFunction, Request, Response } from "express";

/**
 * Check user role permission
 *
 * @param {Array<string>} roles
 *
 * @returns {void}
 */

export default function checkRoleMiddleware(roles: string[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    // get the user  req.body
    const { currUser } = req;
    // check if has any of the given roles
    if (roles.indexOf(currUser.role) > -1) next();
    else
      res.status(401).send({
        message: "You are not allowed to do this request.",
      });
  };
}
