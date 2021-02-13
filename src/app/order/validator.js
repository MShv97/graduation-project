const Joi = require("joi");
const { commonValidators } = require("../../helpers");
const db = require("../../database").models;

module.exports = {
  ...commonValidators,
  //MM-27
  create: Joi.object({
    body: Joi.object({
      tableCode: Joi.string().required(),
      dishes: Joi.array().items(
        Joi.object({
          id: Joi.number().required(),
          amount: Joi.number().required(),
          note: Joi.string(),
        })
      ),
    }).required(),
  }),
  //MM-27
  update: Joi.object({
    params: Joi.object({
      id: Joi.number().min(1).required(),
    }),
    body: Joi.object({
      amount: Joi.number().required(),
      note: Joi.string(),
    }).required(),
  }),
  //MM-27
  updateStatus: Joi.object({
    params: Joi.object({
      id: Joi.number().min(1).required(),
    }),
    body: Joi.object({
      status: Joi.string()
        .valid(...db.Order.STATUS)
        .required(),
    }).required(),
  }),
  // MM-27
  getAll: Joi.object({
    query: Joi.object({
      total: Joi.string().allow(""),
      offset: Joi.number().min(0).default(0),
      limit: Joi.number().min(1).default(50),
      categoryId: Joi.alternatives().try(Joi.array().items(Joi.number()), Joi.number()),
      status: Joi.alternatives().try(
        Joi.array().items(Joi.string().valid(...db.Order.STATUS)),
        Joi.string().valid(...db.Order.STATUS)
      ),
    }),
  }),
};
