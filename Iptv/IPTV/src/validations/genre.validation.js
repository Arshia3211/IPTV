import Joi from "joi";

export const GenreValidationSchema = {
  create: Joi.object().keys({
    name: Joi.string().max(75).required(),
  }),
  update: Joi.object().keys({
    name: Joi.string().max(75).optional(),
  }),
};