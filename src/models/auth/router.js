const controller = require("./controller");
const { joiValidator, catchAsync } = require("../../middlewares");
const validator = require("./validator");
const router = require("express").Router();
//import { AuthValidators, Validator } from "../../routers/reqValidation";

/******************
 * @Router /auth  *
 ******************/

router.post("/login", joiValidator(validator.login), catchAsync(controller.login));
// router.post("/signup", Validator(AuthValidators.signup), AuthController.signup);
// router.post("/refresh-token", Validator(AuthValidators.refreshToken), AuthController.refreshToken);

module.exports = router;
