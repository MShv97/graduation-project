import { Router } from "express";
import AuthController from "../controllers/auth";
import { AuthValidator, Validator } from "./reqValidation";

const router: Router = Router();

router.post("/login", Validator(AuthValidator.login), AuthController.login);
router.post("/signup", Validator(AuthValidator.signup), AuthController.signup);
router.post("/refresh-token", Validator(AuthValidator.refreshToken), AuthController.refreshToken);

export default router;
