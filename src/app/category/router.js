const controller = require("./controller");
const validator = require("./validator");
const { joiValidator, catchAsync, checkRoleMiddleware, authMiddleware } = require("../../middlewares");
const router = require("express").Router();


/**************************
 * @Router /api/category  *
 *************************/

//MM-7
router.post("/", authMiddleware, checkRoleMiddleware(["admin"]), joiValidator(validator.create), catchAsync(controller.create));

router.patch("/:id", authMiddleware, checkRoleMiddleware(["admin"]), joiValidator(validator.update), catchAsync(controller.update));

router.delete("/:id", authMiddleware, checkRoleMiddleware(["admin"]), joiValidator(validator.paramId), catchAsync(controller.delete));

router.get("/:id", authMiddleware, checkRoleMiddleware(["admin"]), joiValidator(validator.paramId), catchAsync(controller.getById));

router.get("/", authMiddleware, checkRoleMiddleware(["admin"]), joiValidator(validator.getAll), catchAsync(controller.getAll));

module.exports = router;
