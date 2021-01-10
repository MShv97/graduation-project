const Joi = require("joi");
const { commonValidators } = require("../../helpers");

module.exports = {
  ...commonValidators,
  //MM-7
  create: Joi.object({
    body: Joi.object({
      menuId: Joi.number().required(),
      name: Joi.string().required(),
      description: Joi.string().required(),
    }).required(),
  }),
  //MM-7
  update: Joi.object({
    params: Joi.object({
      id: Joi.number().required(),
    }).required(),
    body: Joi.object({
      name: Joi.string(),
      description: Joi.string(),
    }).required(),
  }),
  // MM-7
  getAll: Joi.object({
    query: Joi.object({
      menuId: Joi.number().required(),
      total: Joi.string().allow(""),
      offset: Joi.number().min(0).default(0),
      limit: Joi.number().min(1).default(50),
      q: Joi.string().allow(""),
    }).required(),
  }),
};
