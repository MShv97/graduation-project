import Joi from "joi";
import { TableStatus } from "../../entities/Table";

function enumValues(enm: any) {
  return Object.keys(enm).map((key) => enm[key]);
}
//MM-9
const create = Joi.object({
  body: Joi.object({
    code: Joi.string().required(),
  }).required(),
});

//MM-9
const update = Joi.object({
  body: Joi.object({
    table_id: Joi.number().required(),
    code: Joi.string(),
    status: Joi.string().valid(...enumValues(TableStatus)),
  }).required(),
});

export default { create, update };
