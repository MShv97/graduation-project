import Joi from "joi";

//MM-13
const del = Joi.object({
  params: Joi.object({
    id: Joi.number().required(),
  }).required(),
});

export default { del };
