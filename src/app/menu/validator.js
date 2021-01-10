const Joi = require("joi");
const { commonValidators } = require("../../helpers");

module.exports = {
  ...commonValidators,
  //MM-6
  create: Joi.object({
    body: Joi.object({
      name: Joi.string().required(),
      description: Joi.string().required(),
    }).required(),
  }),

  //MM-6
  update: Joi.object({
    params: Joi.object({
      id: Joi.number().required(),
    }).required(),
    body: Joi.object({
      name: Joi.string(),
      description: Joi.string(),
    }).required(),
  }),
};
