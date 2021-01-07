const Joi = require("joi");

function enumValues(enm) {
  return Object.keys(enm).map((key) => enm[key]);
}

const login = Joi.object({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).required(),
});

const refreshToken = Joi.object({
  body: Joi.object({
    refreshToken: Joi.string().required(),
  }).required(),
});

const signup = Joi.object({
  body: Joi.object({
    restaurantId: Joi.number().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    password: Joi.string().min(8).required(),
    role: Joi.string().required(),
    birthdate: Joi.date().required(),
  }).required(),
});

module.exports = { login, signup, refreshToken };
