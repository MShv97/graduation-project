const Joi = require("joi");
const { commonValidators } = require("../../helpers");

module.exports = {
  ...commonValidators,
  //MM-18
  invite: Joi.object({
    body: Joi.object({
      role: Joi.string().valid("admin", "accountant", "waiter", "chief", "author").required(),
      to: Joi.string().required(),
      subject: Joi.string().required(),
      text: Joi.string(),
      html: Joi.string(),
    }),
  }),
};
