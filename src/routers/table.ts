import { Router } from "express";
import TableController from "../controllers/table";
import { authMiddleware, checkRoleMiddleware } from "../middlewares";
import { TableValidator, Validator } from "./reqValidation";

const router: Router = Router();

//MM-9
router.post("/", authMiddleware, checkRoleMiddleware(["admin"]), Validator(TableValidator.create), TableController.create);
router.get("/", authMiddleware, checkRoleMiddleware(["admin"]), Validator(TableValidator.read), TableController.read);
router.patch("/", authMiddleware, checkRoleMiddleware(["admin"]), Validator(TableValidator.update), TableController.update);
router.delete("/:table_id", authMiddleware, checkRoleMiddleware(["admin"]), Validator(TableValidator.del), TableController.del);

export default router;
