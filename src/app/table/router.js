//MM-22
const controller = require("./controller");
const validator = require("./validator");
const { joiValidator, catchAsync, authorization, MulterStorage } = require("../../middlewares");
const router = require("express").Router();

/***********************
 * @Router /api/table  *
 ***********************/

router.post("/", authorization(["admin", "manager", "author"]), joiValidator(validator.create), catchAsync(controller.create));

router.get("/menu", catchAsync(controller.menu));

module.exports = router;
