import { Router } from "express";
import MenuController from "../controllers/menu";
import { authMiddleware, checkRoleMiddleware } from "../../middlewares";
import { GlobalValidators, MenuValidators, Validator } from "../../routers/reqValidation";

const router: Router = Router();

/**********************
 * @Router /api/menu  *
 **********************/

//MM-6
router.post("/", authMiddleware, checkRoleMiddleware(["admin"]), Validator(MenuValidators.create), MenuController.create);
router.get("/", authMiddleware, checkRoleMiddleware(["admin"]), Validator(GlobalValidators.read), MenuController.read);
router.patch("/", authMiddleware, checkRoleMiddleware(["admin"]), Validator(MenuValidators.update), MenuController.update);
router.delete("/:id", authMiddleware, checkRoleMiddleware(["admin"]), Validator(GlobalValidators.del), MenuController.del);

export default router;
