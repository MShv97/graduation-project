const Joi = require("joi");
const { commonValidators } = require("../../helpers");
const sequelize = require("../../database");

module.exports = {
  create: Joi.object({
    body: Joi.object({
      name: Joi.string().required(),
      duration: Joi.number().required(),
      price: Joi.number().required(),
      discount: Joi.number().required(),
      description: Joi.string().required(),
      arDescription: Joi.string().required(),
    }).required(),
  }),

  update: Joi.object({
    paramId: commonValidators.paramId,
    body: Joi.object({
      name: Joi.string(),
      duration: Joi.number(),
      price: Joi.number(),
      discount: Joi.number(),
      description: Joi.string(),
      arDescription: Joi.string(),
    }).required(),
  }),
  paramId: commonValidators.paramId,

  getAll: Joi.object({
    query: Joi.object({
      ...commonValidators.pagination,
    }).required(),
  }),
};
