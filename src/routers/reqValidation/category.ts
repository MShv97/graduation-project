import Joi from "joi";

//MM-7
const create = Joi.object({
  body: Joi.object({
    menu_id: Joi.number().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
  }).required(),
});
//MM-7
const read = Joi.object({
  query: Joi.object({
    menu_id: Joi.number().required(),
    page: Joi.number(),
    size: Joi.number(),
    q: Joi.string(),
  }),
});
//MM-7
const update = Joi.object({
  body: Joi.object({
    category_id: Joi.number().required(),
    name: Joi.string(),
    description: Joi.string(),
  }).required(),
});
//MM-7
const del = Joi.object({
  params: Joi.object({
    category_id: Joi.number().required(),
  }).required(),
});

export default { create, read, update, del };
