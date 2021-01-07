const controller = require("./controller");
const validator = require("./validator");
const { joiValidator, catchAsync, checkRoleMiddleware, authMiddleware, MulterStorage } = require("../../middlewares");
const router = require("express").Router();

const images = require("./images/router");

/**********************
 * @Router /api/dish  *
 **********************/

//MM-8
router.post("/", authMiddleware, checkRoleMiddleware(["admin"]), MulterStorage.array("images", 4), joiValidator(validator.create), catchAsync(controller.create));

router.patch("/:id", authMiddleware, checkRoleMiddleware(["admin"]), MulterStorage.array("images", 4), joiValidator(validator.update), catchAsync(controller.update));

router.delete("/:id", authMiddleware, checkRoleMiddleware(["admin"]), joiValidator(validator.update), catchAsync(controller.delete));

router.get("/:id", authMiddleware, checkRoleMiddleware(["admin"]), joiValidator(validator.paramId), catchAsync(controller.getById));

router.get("/", authMiddleware, checkRoleMiddleware(["admin"]), joiValidator(validator.getAll), catchAsync(controller.getAll));

/***********************************
 * @SubRouter /api/dish/:id/image  *
 ***********************************/

router.use("/:id/image", images);

module.exports = router;
