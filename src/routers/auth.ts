import { Router } from "express";
import AuthController from "../controllers/auth";

const router: Router = Router();

router.post("/login", AuthController.login);
router.post("/signup", AuthController.signup);
router.post("/refresh-token", AuthController.refreshToken);

export default router;
