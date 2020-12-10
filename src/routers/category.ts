import { Router } from "express";
import CategoryController from "../controllers/category";
import { authMiddleware, checkRoleMiddleware } from "../middlewares";
import { CategoryValidator, Validator } from "./reqValidation";

const router: Router = Router();

//MM-7
router.post("/", authMiddleware, checkRoleMiddleware(["admin"]), Validator(CategoryValidator.create), CategoryController.create);
router.get("/", authMiddleware, checkRoleMiddleware(["admin"]), Validator(CategoryValidator.read), CategoryController.read);
router.patch("/", authMiddleware, checkRoleMiddleware(["admin"]), Validator(CategoryValidator.update), CategoryController.update);
router.delete("/:menu_id", authMiddleware, checkRoleMiddleware(["admin"]), Validator(CategoryValidator.del), CategoryController.del);

export default router;
