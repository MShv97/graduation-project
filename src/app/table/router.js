import { Router } from "express";
import TableController from "../controllers/table";
import { authMiddleware, checkRoleMiddleware } from "../../middlewares";
import { GlobalValidators, TableValidators, Validator } from "../../routers/reqValidation";

const router: Router = Router();

/***********************
 * @Router /api/table  *
 ***********************/

//MM-9
router.post("/", authMiddleware, checkRoleMiddleware(["admin"]), Validator(TableValidators.create), TableController.create);
router.get("/", authMiddleware, checkRoleMiddleware(["admin"]), Validator(GlobalValidators.read), TableController.read);
router.patch("/", authMiddleware, checkRoleMiddleware(["admin"]), Validator(TableValidators.update), TableController.update);
router.delete("/:id", authMiddleware, checkRoleMiddleware(["admin"]), Validator(GlobalValidators.del), TableController.del);

export default router;
