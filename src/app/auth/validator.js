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

module.exports = { login, refreshToken };
