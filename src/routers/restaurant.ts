import { Router } from "express";
import RestaurantController from "../controllers/restaurant";
import { AuthValidators, RestaurantValidators, Validator } from "./reqValidation";

const router: Router = Router();

/****************************
 * @Router /api/restaurant  *
 ****************************/

//MM-6
// login restaurant validator is the same from Auth
router.post("/login", Validator(AuthValidators.login), RestaurantController.login);
router.post("/signup", Validator(RestaurantValidators.signup), RestaurantController.signup);

export default router;
