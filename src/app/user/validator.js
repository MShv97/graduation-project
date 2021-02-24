const Joi = require("joi");
const { commonValidators } = require("../../helpers");
const db = require("../../database").models;

module.exports = {
  paramId: commonValidators.paramId,
  //MM-18
  invite: Joi.object({
    body: Joi.object({
      role: Joi.string()
        .valid(...db.User.ROLES)
        .required(),
      to: Joi.string().required(),
      subject: Joi.string(),
      text: Joi.string(),
      html: Joi.string(),
    }),
  }),
  update: Joi.object({
    paramId: commonValidators.paramId,
    body: Joi.object({
      status: Joi.string().valid(...db.User.STATUS),
      role: Joi.string().valid(...db.User.ROLES),
      verified: Joi.boolean(),
    }).required(),
  }),
  getAll: Joi.object({
    query: Joi.object({
      ...commonValidators.pagination,
      role: Joi.alternatives().try(
        Joi.array().items(Joi.string().valid(...db.User.ROLES)),
        Joi.string().valid(...db.User.ROLES)
      ),
    }),
  }),
  updateProfile: Joi.object({
    body: Joi.object({
      firstName: Joi.string(),
      lastName: Joi.string(),
      phone: Joi.string(),
      birthdate: Joi.date(),
      address: Joi.string(),
    }).required(),
  }),
};
