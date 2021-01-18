const controller = require("./controller");
const validator = require("./validator");
const { joiValidator, catchAsync, authorization, MulterStorage } = require("../../middlewares");
const router = require("express").Router();

/**********************
 * @Router /api/user  *
 **********************/

//MM-18
router.post("/invite", authorization(["admin", "manager"]), joiValidator(validator.invite), catchAsync(controller.invite));
//MM-19
router.post("/signup", joiValidator(validator.signup), catchAsync(controller.signup));

module.exports = router;
