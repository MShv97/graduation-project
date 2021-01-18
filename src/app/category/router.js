const controller = require("./controller");
const validator = require("./validator");
const { joiValidator, catchAsync, authorization } = require("../../middlewares");
const router = require("express").Router();

/**************************
 * @Router /api/category  *
 *************************/

//MM-7
router.post("/", authorization(["admin", "manager", "author"]), joiValidator(validator.create), catchAsync(controller.create));

router.patch("/:id", authorization(["admin", "manager", "author"]), joiValidator(validator.update), catchAsync(controller.update));

router.delete("/:id", authorization(["admin", "manager", "author"]), joiValidator(validator.paramId), catchAsync(controller.delete));

router.get("/:id", authorization(["admin", "manager", "author"]), joiValidator(validator.paramId), catchAsync(controller.getById));

router.get("/", authorization(["admin", "manager", "author"]), joiValidator(validator.getAll), catchAsync(controller.getAll));

module.exports = router;
