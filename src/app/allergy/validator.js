const Joi = require("joi");
const { commonValidators } = require("../../helpers");
const sequelize = require("../../database");

module.exports = {
  ...commonValidators,
  getAll: Joi.object({
    query: Joi.object({
      total: Joi.string().allow(""),
      offset: Joi.number().min(0).default(0),
      limit: Joi.number().min(1).default(50),
      q: Joi.string().allow(""),
      order: Joi.string().valid("name", "arName").required(),
    }),
  }),
};
