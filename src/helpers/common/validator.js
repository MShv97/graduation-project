const Joi = require("joi");

module.exports = {
  //MM-13
  paramId: Joi.object({
    params: Joi.object({
      id: Joi.number().required(),
    }).required(),
  }),
  //MM-13
  getAll: Joi.object({
    query: Joi.object({
      total: Joi.string().allow(""),
      offset: Joi.number().min(0).default(0),
      limit: Joi.number().min(1).default(50),
      q: Joi.string().allow(""),
    }),
  }),
};
