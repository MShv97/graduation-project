const Joi = require("joi");
const { commonValidators } = require("../../helpers");

module.exports = {
  ...commonValidators,
  //MM-8
  create: Joi.object({
    body: Joi.object({
      categoryId: Joi.number().required(),
      name: Joi.string().required(),
      description: Joi.string().required(),
      code: Joi.string().required(),
      price: Joi.number().required(),
      allergies: Joi.string(),
      calories: Joi.number(),
    }).required(),
  }),
  //MM-8
  update: Joi.object({
    params: Joi.object({
      id: Joi.number().required(),
    }).required(),
    body: Joi.object({
      name: Joi.string(),
      description: Joi.string(),
      code: Joi.string(),
      price: Joi.number(),
      discount: Joi.number(),
      status: Joi.string(),
      allergies: Joi.string(),
      calories: Joi.number(),
    }).required(),
  }),
  // MM-8
  getAll: Joi.object({
    query: Joi.object({
      categoryId: Joi.number().required(),
      total: Joi.string().allow(""),
      offset: Joi.number().min(0).default(0),
      limit: Joi.number().min(1).default(50),
      q: Joi.string().allow(""),
    }).required(),
  }),
};
