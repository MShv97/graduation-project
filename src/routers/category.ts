import { Router } from "express";
import CategoryController from "../controllers/category";
import { authMiddleware, checkRoleMiddleware, MulterStorage } from "../middlewares";
import { CategoryValidators, GlobalValidators, Validator } from "./reqValidation";

const router: Router = Router();

/*************************
 * @Router /api/category *
 *************************/

//MM-7
router.post("/", authMiddleware, checkRoleMiddleware(["admin"]), MulterStorage.single("thumpnail"), Validator(CategoryValidators.create), CategoryController.create);
router.get("/", Validator(CategoryValidators.read), CategoryController.read);
router.patch("/", authMiddleware, checkRoleMiddleware(["admin"]), MulterStorage.single("thumpnail"), Validator(CategoryValidators.update), CategoryController.update);
router.delete("/:id", authMiddleware, checkRoleMiddleware(["admin"]), Validator(GlobalValidators.del), CategoryController.del);
router.delete("/thumpnail/:id", authMiddleware, checkRoleMiddleware(["admin"]), Validator(GlobalValidators.del), CategoryController.deleteThumpnail);

export default router;
