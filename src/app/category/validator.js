const Joi = require("joi");
const { commonValidators } = require("../../helpers");
const sequelize = require("../../database");

module.exports = {
  ...commonValidators,
  //MM-7
  create: Joi.object({
    body: Joi.object({
      menuId: Joi.number().required(),
      title: Joi.string().required(),
      arTitle: Joi.string().required(),
      iconId: Joi.number().required(),
    }).required(),
  }),
  //MM-7
  update: Joi.object({
    params: Joi.object({
      id: Joi.number().required(),
    }).required(),
    body: Joi.object({
      title: Joi.string(),
      arTitle: Joi.string(),
      iconId: Joi.number(),
      status: Joi.string().valid(...sequelize.models.Category.STATUS),
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
      status: Joi.alternatives().try(
        Joi.array().items(Joi.string().valid(...sequelize.models.Category.STATUS)),
        Joi.string().valid(...sequelize.models.Category.STATUS)
      ),
    }).required(),
  }),
  getById: Joi.object({
    params: Joi.object({
      id: Joi.number().required(),
    }).required(),
    query: Joi.object({
      limit: Joi.number().min(1).default(50),
    }),
  }),
};
