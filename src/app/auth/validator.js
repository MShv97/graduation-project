const Joi = require("joi");

const password = Joi.string().min(8).max(36).required();

module.exports = {
  login: Joi.object({
    body: Joi.object({
      email: Joi.string().email().required(),
      password,
    }).required(),
  }),

  refreshToken: Joi.object({
    body: Joi.object({
      refreshToken: Joi.string().required(),
    }).required(),
  }),

  forgetPassword: Joi.object({
    body: Joi.object({
      email: Joi.string().email().required(),
    }).required(),
  }),

  signup: Joi.object({
    body: Joi.object({
      token: Joi.string().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      phone: Joi.string().required(),
      password,
      birthdate: Joi.date().required(),
      address: Joi.string().required(),
    }).required(),
  }),

  resetPassword: Joi.object({
    body: Joi.object({
      token: Joi.string().required(),
      password,
    }).required(),
  }),

  verify: Joi.object({
    body: Joi.object({
      code: Joi.string().required(),
    }).required(),
  }),
};
