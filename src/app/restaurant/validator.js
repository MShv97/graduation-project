const Joi = require("joi");
const { commonValidators } = require("../../helpers");

module.exports = {
  paramId: commonValidators.paramId,
  //MM-19
  signup: Joi.object({
    body: Joi.object({
      subscriptionId: Joi.number().required(),
      name: Joi.string().required(),
      address: Joi.string().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
      password: Joi.string().min(8).required(),
      birthdate: Joi.date().required(),
    }),
  }),
};
