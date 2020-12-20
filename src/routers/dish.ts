import { Router } from "express";
import DishController from "../controllers/dish";
import { authMiddleware, checkRoleMiddleware, MulterStorage } from "../middlewares";
import { DishValidator, Validator } from "./reqValidation";

const router: Router = Router();

//MM-8
router.post("/", authMiddleware, checkRoleMiddleware(["admin"]), MulterStorage.array("images", 4), Validator(DishValidator.create), DishController.create);
router.get("/", Validator(DishValidator.read), DishController.read);
router.patch("/", authMiddleware, checkRoleMiddleware(["admin"]), MulterStorage.array("images", 4), Validator(DishValidator.update), DishController.update);
router.delete("/:dish_id", authMiddleware, checkRoleMiddleware(["admin"]), Validator(DishValidator.del), DishController.del);
router.delete("/image/:image_id", authMiddleware, checkRoleMiddleware(["admin"]), Validator(DishValidator.deleteImage), DishController.deleteImage);

export default router;
