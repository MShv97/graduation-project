import { Router } from "express";
import RestaurantController from "../controllers/restaurant";
import { AuthValidator, RestaurantValidator, Validator } from "./reqValidation";

const router: Router = Router();

//MM-6
// login restaurant validator is the same from Auth
router.post("/login", Validator(AuthValidator.login), RestaurantController.login);
router.post("/signup", Validator(RestaurantValidator.signup), RestaurantController.signup);

export default router;
