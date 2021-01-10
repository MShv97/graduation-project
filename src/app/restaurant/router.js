const controller = require("./controller");
const validator = require("./validator");
const { joiValidator, catchAsync, checkRoleMiddleware, authMiddleware, MulterStorage } = require("../../middlewares");
const router = require("express").Router();

/****************************
 * @Router /api/restaurant  *
 ****************************/
router.post("/signup", joiValidator(validator.signup), catchAsync(controller.signup));

module.exports = router;
