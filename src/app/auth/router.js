const controller = require("./controller");
const { joiValidator, catchAsync } = require("../../middlewares");
const validator = require("./validator");
const router = require("express").Router();

/******************
 * @Router /auth  *
 ******************/

router.post("/login", joiValidator(validator.login), catchAsync(controller.login));
router.post("/refresh-token", joiValidator(validator.refreshToken), catchAsync(controller.refreshToken));

module.exports = router;
