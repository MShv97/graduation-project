// MM-30
const controller = require("./controller");
const validator = require("../../helpers/common/validator");
const { joiValidator, catchAsync, authorization } = require("../../middlewares");
const router = require("express").Router();

/***********************
 * @Router /api/icons  *
 ***********************/
//MM-30

router.get("/", authorization(["any"]), joiValidator(validator.getAll), catchAsync(controller.getAll));

module.exports = router;
