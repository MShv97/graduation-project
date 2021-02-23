const controller = require("./controller");
const validator = require("./validator");
const { joiValidator, catchAsync, authorization, MulterStorage } = require("../../middlewares");
const router = require("express").Router();

/**********************
 * @Router /api/user  *
 **********************/

router.post("/invite", authorization(["admin", "manager"]), joiValidator(validator.invite), catchAsync(controller.invite));

router.get("/", authorization(["admin", "manager"]), joiValidator(validator.getAll), catchAsync(controller.getAll));

router.get("/:id", authorization(["admin", "manager"]), joiValidator(validator.getById), catchAsync(controller.getById));

router.patch("/:id", authorization(["admin", "manager"]), joiValidator(validator.update), catchAsync(controller.update));

router.get("/profile", authorization(["any"]), joiValidator(validator.getProfile), catchAsync(controller.getProfile));

router.patch("/profile", authorization(["any"]), joiValidator(validator.updateProfile), catchAsync(controller.updateProfile));

router.patch("/resend-verification", authorization(["any"]), joiValidator(validator.resendVerification), catchAsync(controller.resendVerification));

module.exports = router;
