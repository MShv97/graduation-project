import Joi from "joi";

//MM-6
const signup = Joi.object({
  body: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    address: Joi.string(),
  }).required(),
});

export default { signup };
