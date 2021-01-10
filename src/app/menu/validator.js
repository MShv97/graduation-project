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

  // MM-6
  getAll: Joi.object({
    query: Joi.object({
      total: Joi.string().allow(""),
      offset: Joi.number().min(0).default(0),
      limit: Joi.number().min(1).default(50),
      q: Joi.string().allow(""),
    }).required(),
  }),
};
