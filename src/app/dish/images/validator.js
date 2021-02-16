const Joi = require("joi");
const { commonValidators } = require("../../../helpers");

module.exports = {
  // MM-16
  paramIdImageId: Joi.object({
    params: Joi.object({
      id: Joi.number().required(),
      imageId: Joi.number().required(),
    }).required(),
  }),
};
