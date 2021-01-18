const Joi = require("joi");
const { commonValidators } = require("../../helpers");

module.exports = {
  ...commonValidators,
  //MM-22
  create: Joi.object({
    body: Joi.object({
      count: Joi.number().required(),
    }),
  }),
};
