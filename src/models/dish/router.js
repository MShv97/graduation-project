import { Router } from "express";
import DishController from "../controllers/dish";
import { authMiddleware, checkRoleMiddleware, MulterStorage } from "../../middlewares";
import { DishValidators, GlobalValidators, Validator } from "../../routers/reqValidation";

const router: Router = Router();

/**********************
 * @Router /api/dish  *
 **********************/

//MM-8
router.post("/", authMiddleware, checkRoleMiddleware(["admin"]), MulterStorage.array("images", 4), Validator(DishValidators.create), DishController.create);
router.get("/", Validator(DishValidators.read), DishController.read);
router.patch("/", authMiddleware, checkRoleMiddleware(["admin"]), MulterStorage.array("images", 4), Validator(DishValidators.update), DishController.update);
router.delete("/:id", authMiddleware, checkRoleMiddleware(["admin"]), Validator(GlobalValidators.del), DishController.del);
router.delete("/image/:id", authMiddleware, checkRoleMiddleware(["admin"]), Validator(GlobalValidators.del), DishController.deleteImage);

export default router;
