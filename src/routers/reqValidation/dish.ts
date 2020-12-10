import Joi from "joi";

//MM-7
const read = Joi.object({
  query: Joi.object({
    category_Id: Joi.number().required(),
    page: Joi.number(),
    size: Joi.number(),
    q: Joi.string(),
  }),
});

export default {};
