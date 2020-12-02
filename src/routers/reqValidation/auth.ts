import Joi = require("joi");
import { UserType } from "../../entities/User";

function enumValues(enm: any) {
  return Object.keys(enm).map(key => enm[key]);
}

const loginBody = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const refreshTokenBody = Joi.object({
  refresh_token: Joi.string().required(),
});

const signupBody = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  type: Joi.string()
    .valid(...enumValues(UserType))
    .required(),
  birthdate: Joi.date().required(),
});

const login = Joi.object({
  body: loginBody.required(),
});

const refreshToken = Joi.object({
  body: refreshTokenBody.required(),
});

const signup = Joi.object({
  body: signupBody.required(),
});

export default { login, signup, refreshToken };
