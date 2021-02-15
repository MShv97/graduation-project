// MM-29
const controller = require("./controller");
const validator = require("./validator");
const { joiValidator, catchAsync, authorization } = require("../../middlewares");
const router = require("express").Router();

/***********************
 * @Router /api/table  *
 ***********************/
//MM-29
router.get("/:code", joiValidator(validator.getByCode), catchAsync(controller.getByCode));

module.exports = router;
