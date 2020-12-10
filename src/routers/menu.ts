import { Router } from "express";
import MenuController from "../controllers/menu";
import { authMiddleware, checkRoleMiddleware } from "../middlewares";
import { MenuValidator, Validator } from "./reqValidation";

const router: Router = Router();

//MM-6
router.post("/", authMiddleware, checkRoleMiddleware(["admin"]), Validator(MenuValidator.create), MenuController.create);
router.get("/", authMiddleware, checkRoleMiddleware(["admin"]), Validator(MenuValidator.read), MenuController.read);
router.patch("/", authMiddleware, checkRoleMiddleware(["admin"]), Validator(MenuValidator.update), MenuController.update);
router.delete("/:menu_id", authMiddleware, checkRoleMiddleware(["admin"]), Validator(MenuValidator.del), MenuController.del);

export default router;
