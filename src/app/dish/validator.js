const Joi = require("joi");
const { commonValidators } = require("../../helpers");
const sequelize = require("../../database");

module.exports = {
  ...commonValidators,
  //MM-8
  create: Joi.object({
    body: Joi.object({
      categoryId: Joi.number().required(),
      name: Joi.string().required(),
      arName: Joi.string().required(),
      description: Joi.string().required(),
      arDescription: Joi.string().required(),
      code: Joi.string().required(),
      price: Joi.number().required(),
      calories: Joi.number(),
      preparationTime: Joi.number().required(),
      allergies: Joi.alternatives().try(Joi.array().items(Joi.number()), Joi.number()),
    }).required(),
  }),
  //MM-8
  update: Joi.object({
    params: Joi.object({
      id: Joi.number().required(),
    }).required(),
    body: Joi.object({
      name: Joi.string(),
      arName: Joi.string(),
      description: Joi.string(),
      arDescription: Joi.string(),
      code: Joi.string(),
      price: Joi.number(),
      discount: Joi.number(),
      status: Joi.string().valid(...sequelize.models.Dish.STATUS),
      allergies: Joi.alternatives().try(Joi.array().items(Joi.number()), Joi.number()),
      calories: Joi.number(),
      preparationTime: Joi.number(),
    }).required(),
  }),
  // MM-8
  getAll: Joi.object({
    query: Joi.object({
      categoryId: Joi.alternatives().try(Joi.array().items(Joi.number()), Joi.number()),
      restaurantId: Joi.number(),
      total: Joi.string().allow(""),
      offset: Joi.number().min(0).default(0),
      limit: Joi.number().min(1).default(50),
      q: Joi.string().allow(""),
      status: Joi.alternatives().try(
        Joi.array().items(Joi.string().valid(...sequelize.models.Dish.STATUS)),
        Joi.string().valid(...sequelize.models.Dish.STATUS)
      ),
    }).or("categoryId", "restaurantId"),
  }),
};
