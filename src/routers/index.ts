import { Router } from "express";
import AuthRouter from "./auth";

const router: Router = Router();

router.use("/api", (req, res) => {
  res.send("Hello world!");
});
router.use("/auth", AuthRouter);

export { router };
