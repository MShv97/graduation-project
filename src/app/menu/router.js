const controller = require("./controller");
const validator = require("./validator");
const { joiValidator, catchAsync, authorization, MulterStorage } = require("../../middlewares");
const router = require("express").Router();

/**********************
 * @Router /api/menu  *
 **********************/

//MM-6
router.post("/", authorization(["admin", "manager", "author"]), MulterStorage.single("image"), joiValidator(validator.create), catchAsync(controller.create));

router.patch("/:id", authorization(["admin", "manager", "author"]), MulterStorage.single("image"), joiValidator(validator.update), catchAsync(controller.update));

router.delete("/:id", authorization(["admin", "manager", "author"]), joiValidator(validator.paramId), catchAsync(controller.delete));

router.delete("/:id/image", authorization(["admin", "manager", "author"]), joiValidator(validator.paramId), catchAsync(controller.deleteImage));

router.get("/:id", authorization(["any"]), joiValidator(validator.paramId), catchAsync(controller.getById));

router.get("/", authorization(["any"]), joiValidator(validator.getAll), catchAsync(controller.getAll));

module.exports = router;
