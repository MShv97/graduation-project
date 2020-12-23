import Joi from "joi";
import { DishStatus } from "../../entities/Dish";

function enumValues(enm: any) {
  return Object.keys(enm).map(key => enm[key]);
}

//MM-8
const create = Joi.object({
  body: Joi.object({
    category_id: Joi.number().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    code: Joi.string().required(),
    price: Joi.number().required(),
  }).required(),
});

//MM-8
const read = Joi.object({
  query: Joi.object({
    category_id: Joi.number().required(),
    page: Joi.number(),
    size: Joi.number(),
    q: Joi.string(),
  }),
});

//MM-8
const update = Joi.object({
  body: Joi.object({
    dish_id: Joi.number().required(),
    name: Joi.string(),
    description: Joi.string(),
    code: Joi.string(),
    price: Joi.number(),
    discount: Joi.number(),
    status: Joi.string().valid(...enumValues(DishStatus)),
  }).required(),
});

export default { create, read, update };
