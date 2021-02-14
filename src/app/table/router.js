//MM-22
const controller = require("./controller");
const validator = require("./validator");
const { joiValidator, catchAsync, authorization, MulterStorage } = require("../../middlewares");
const router = require("express").Router();

/***********************
 * @Router /api/table  *
 ***********************/

module.exports = router;
