import { Router } from "express";
import CategoryController from "../controllers/category";
import { authMiddleware, checkRoleMiddleware, MulterStorage } from "../middlewares";
import { CategoryValidator, Validator } from "./reqValidation";

const router: Router = Router();

//MM-7
router.post("/", authMiddleware, checkRoleMiddleware(["admin"]), MulterStorage.single("thumpnail"), Validator(CategoryValidator.create), CategoryController.create);
router.get("/", Validator(CategoryValidator.read), CategoryController.read);
router.patch("/", authMiddleware, checkRoleMiddleware(["admin"]), MulterStorage.single("thumpnail"), Validator(CategoryValidator.update), CategoryController.update);
router.delete("/:category_id", authMiddleware, checkRoleMiddleware(["admin"]), Validator(CategoryValidator.del), CategoryController.del);
router.delete("/thumpnail/:category_id", authMiddleware, checkRoleMiddleware(["admin"]), Validator(CategoryValidator.del), CategoryController.deleteThumpnail);

export default router;
