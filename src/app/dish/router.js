const controller = require("./controller");
const validator = require("./validator");
const { joiValidator, catchAsync, authorization, MulterStorage } = require("../../middlewares");
const router = require("express").Router();

const images = require("./images/router");

/**********************
 * @Router /api/dish  *
 **********************/

//MM-8
router.post("/", authorization(["admin", "manager", "author"]), MulterStorage.array("images", 4), joiValidator(validator.create), catchAsync(controller.create));

router.patch("/:id", authorization(["admin", "manager", "author"]), MulterStorage.array("images", 4), joiValidator(validator.update), catchAsync(controller.update));

router.delete("/:id", authorization(["admin", "manager", "author"]), joiValidator(validator.update), catchAsync(controller.delete));

router.get("/:id", authorization(["admin", "manager", "author"]), joiValidator(validator.paramId), catchAsync(controller.getById));

router.get("/", authorization(["admin", "manager", "author"]), joiValidator(validator.getAll), catchAsync(controller.getAll));

/***********************************
 * @SubRouter /api/dish/:id/image  *
 ***********************************/

router.use("/:id/image", images);

module.exports = router;
