const controller = require("./controller");
const validator = require("./validator");
const { joiValidator, catchAsync, authorization } = require("../../../middlewares");
const router = require("express").Router({ mergeParams: true });

/********************************
 * @Router /api/dish/:id/image  *
 ********************************/

//MM-16
router.delete("/:imageId", authorization(["admin", "manager", "author"]), joiValidator(validator.paramIdImageId), catchAsync(controller.delete));

module.exports = router;
