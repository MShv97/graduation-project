const controller = require("./controller");
const validator = require("./validator");
const { joiValidator, catchAsync, authorization } = require("../../middlewares");
const router = require("express").Router();

/***********************
 * @Router /api/order  *
 ***********************/

router.post("/", joiValidator(validator.create), catchAsync(controller.create));

router.patch("/:id/status", authorization(["chief"]), joiValidator(validator.updateStatus), catchAsync(controller.updateStatus));

router.patch("/:id", joiValidator(validator.update), catchAsync(controller.update));

router.get("/", authorization(["any"]), joiValidator(validator.getAll), catchAsync(controller.getAll));

router.get("/:id", authorization(["any"]), joiValidator(validator.paramId), catchAsync(controller.getById));

module.exports = router;
