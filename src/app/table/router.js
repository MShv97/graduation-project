// MM-30
const controller = require("./controller");
const validator = require("./validator");
const { joiValidator, catchAsync, authorization } = require("../../middlewares");
const router = require("express").Router();

/***********************
 * @Router /api/table  *
 ***********************/
//MM-30
router.get("/:code", authorization(["any"]), joiValidator(validator.getByCode), catchAsync(controller.getByCode));

module.exports = router;
