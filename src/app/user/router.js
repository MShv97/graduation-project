const controller = require("./controller");
const validator = require("./validator");
const { joiValidator, catchAsync, authorization, MulterStorage } = require("../../middlewares");
const router = require("express").Router();

/**********************
 * @Router /api/user  *
 **********************/

router.get("/profile", authorization(["any"]), catchAsync(controller.getProfile));

router.patch("/profile", authorization(["any"]), MulterStorage.single("image"), joiValidator(validator.updateProfile), catchAsync(controller.updateProfile));

router.delete("/profile/image", authorization(["any"]), catchAsync(controller.deleteImage));

router.patch("/resend-verification", authorization(["any"]), joiValidator(validator.resendVerification), catchAsync(controller.resendVerification));

/*****************
 * admin routes  *
 *****************/

router.post("/invite", authorization(["admin", "manager"]), joiValidator(validator.invite), catchAsync(controller.invite));

router.get("/", authorization(["admin", "manager"]), joiValidator(validator.getAll), catchAsync(controller.getAll));

router.get("/:id", authorization(["admin", "manager"]), joiValidator(validator.paramId), catchAsync(controller.getById));

router.patch("/:id", authorization(["admin", "manager"]), joiValidator(validator.update), catchAsync(controller.update));

module.exports = router;
