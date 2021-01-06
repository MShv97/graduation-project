const Joi = require("joi");

//MM-13
const del = Joi.object({
  params: Joi.object({
    id: Joi.number().required(),
  }).required(),
});
//MM-13
const read = Joi.object({
  query: Joi.object({
    page: Joi.number(),
    size: Joi.number(),
    q: Joi.string(),
  }),
});

module.exports = { del, read };
