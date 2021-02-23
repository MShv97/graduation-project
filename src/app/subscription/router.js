const controller = require("./controller");
const validator = require("./validator");
const { joiValidator, catchAsync, authorization } = require("../../middlewares");
const router = require("express").Router();

/*************************
 * @Router /api/allergy  *
 *************************/
//MM-34
//TODO super admin user and add authorization here

router.post("/", joiValidator(validator.create), catchAsync(controller.create));

router.patch("/:id", joiValidator(validator.update), catchAsync(controller.update));

router.delete("/:id", joiValidator(validator.paramId), catchAsync(controller.delete));

router.get("/:id", joiValidator(validator.paramId), catchAsync(controller.getById));

router.get("/", joiValidator(validator.getAll), catchAsync(controller.getAll));

module.exports = router;
