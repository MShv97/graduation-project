import Joi from "joi";

//MM-6
const create = Joi.object({
  body: Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
  }).required(),
});

//MM-6
const update = Joi.object({
  body: Joi.object({
    menuId: Joi.number().required(),
    name: Joi.string(),
    description: Joi.string(),
  }).required(),
});

export default { create, update };
