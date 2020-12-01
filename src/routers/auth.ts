import { Router } from "express";

const router: Router = Router();

router.use("/login");
router.use("/signup");
router.use("/refresh-token");

export { router };
