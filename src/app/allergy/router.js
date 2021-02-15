// MM-30
const controller = require("./controller");
const validator = require("./validator");
const { joiValidator, catchAsync, authorization } = require("../../middlewares");
const router = require("express").Router();

/***********************
 * @Router /api/allergy  *
 ***********************/
//MM-30

router.get("/:id", authorization(["any"]), joiValidator(validator.paramId), catchAsync(controller.getById));

router.get("/", authorization(["any"]), joiValidator(validator.getAll), catchAsync(controller.getAll));

module.exports = router;
