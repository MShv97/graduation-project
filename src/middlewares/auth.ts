import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

class userReq {
    userId: any;
    type: any;
}
// add currUser to the request interface
declare module 'express-serve-static-core' {
    interface Request {
        currUser?: userReq
    }
    interface Response {
        currUser?: userReq
    }
}
export default async function authenticationMiddleware(req: Request, res: Response, next: NextFunction) {

    // get the authorization header from request
    const authorizationHeader: string = <string>(req.headers['authorization'] || req.headers['Authorization']);
    let payload: any;
    try {
        const token = authorizationHeader.split(' ')[1];

        payload = <any>verify(token, process.env.JWT_SECRET);

        // extract userId , type
        const { userId, type } = payload;
        req.currUser = { userId, type };

    } catch (err) {
        res.status(401).send({
            status: "Unauthenticated",
            message: "You are not logged in.",
        })
        return
    }

    next();
}