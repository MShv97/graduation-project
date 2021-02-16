const Joi = require("joi");
const { commonValidators, statusCodes } = require("../../helpers");
const sequelize = require("../../database");

module.exports = {
  paramId: commonValidators.paramId,
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
      ...commonValidators.pagination,
      categoryId: Joi.alternatives().try(Joi.array().items(Joi.number()), Joi.number()),
      restaurantId: Joi.number(),
      status: Joi.alternatives().try(
        Joi.array().items(Joi.string().valid(...sequelize.models.Dish.STATUS)),
        Joi.string().valid(...sequelize.models.Dish.STATUS)
      ),
    }).or("categoryId", "restaurantId"),
  }),
  //MM-
  changeStatus: Joi.object({
    params: Joi.object({
      id: Joi.number().required(),
    }).required(),
    body: Joi.object({
      status: Joi.string()
        .valid(...sequelize.models.Dish.STATUS)
        .required(),
    }).required(),
  }),
};
