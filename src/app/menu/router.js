const controller = require("./controller");
const validator = require("./validator");
const { joiValidator, catchAsync, authorization, MulterStorage } = require("../../middlewares");
const router = require("express").Router();

/**********************
 * @Router /api/menu  *
 **********************/

//MM-6
router.post("/", authorization(["admin", "manager", "author"]), joiValidator(validator.create), catchAsync(controller.create));

router.patch("/:id", authorization(["admin", "manager", "author"]), joiValidator(validator.update), catchAsync(controller.update));

router.delete("/:id", authorization(["admin", "manager", "author"]), joiValidator(validator.paramId), catchAsync(controller.delete));

router.get("/:id", joiValidator(validator.paramId), catchAsync(controller.getById));

router.get("/", joiValidator(validator.getAll), catchAsync(controller.getAll));

module.exports = router;
