const Joi = require("joi");
const { commonValidators } = require("../../helpers");

module.exports = {
  ...commonValidators,
  //MM-18
  invite: Joi.object({
    body: Joi.object({
      role: Joi.string().valid("admin", "accountant", "waiter", "chief", "author").required(),
      to: Joi.string().required(),
      subject: Joi.string(),
      text: Joi.string(),
      html: Joi.string(),
    }),
  }),
  //MM-19
  signup: Joi.object({
    body: Joi.object({
      token: Joi.string().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
      password: Joi.string().min(8).required(),
      birthdate: Joi.date().required(),
      address: Joi.string().require(),
    }).required(),
  }),
};
