const Joi = require("joi");
const { commonValidators } = require("../../helpers");

module.exports = {
  ...commonValidators,
  //MM-6
  create: Joi.object({
    body: Joi.object({
      title: Joi.string().required(),
      arTitle: Joi.string().required(),
      currency: Joi.string().required(),
    }).required(),
  }),

  //MM-6
  update: Joi.object({
    params: Joi.object({
      id: Joi.number().required(),
    }).required(),
    body: Joi.object({
      title: Joi.string(),
      arTitle: Joi.string(),
      currency: Joi.string(),
    }).required(),
  }),
};
