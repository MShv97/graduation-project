import { Router } from "express";
import AuthController from "../controllers/auth";
import { AuthValidators, Validator } from "./reqValidation";

const router: Router = Router();

router.post("/login", Validator(AuthValidators.login), AuthController.login);
router.post("/signup", Validator(AuthValidators.signup), AuthController.signup);
router.post("/refresh-token", Validator(AuthValidators.refreshToken), AuthController.refreshToken);

export default router;
