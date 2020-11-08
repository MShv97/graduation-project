import { Router } from "express";
import { DDTLogger } from "../helpers";


const router: Router = Router();

const reqLogger = (req, res, next) => {
    DDTLogger.log(req.originalUrl);
    next();
};

router.use("/", reqLogger);
router.use("/api", (req, res) => {
    res.send("Hello world!")
});



export { router };