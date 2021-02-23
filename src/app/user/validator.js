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
};
