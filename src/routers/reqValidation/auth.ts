import Joi from "joi";
import { UserRole } from "../../entities/User";

function enumValues(enm: any) {
  return Object.keys(enm).map(key => enm[key]);
}

const login = Joi.object({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).required(),
});

const refreshToken = Joi.object({
  body: Joi.object({
    refresh_token: Joi.string().required(),
  }).required(),
});

const signup = Joi.object({
  body: Joi.object({
    restaurant_id: Joi.number().required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    role: Joi.string()
      .valid(...enumValues(UserRole))
      .required(),
    birthdate: Joi.date().required(),
  }).required(),
});

export default { login, signup, refreshToken };
