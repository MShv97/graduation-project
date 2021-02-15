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
  //MM-29
  getByCode: Joi.object({
    params: Joi.object({
      code: Joi.string().required(),
    }).required(),
  }),
};
