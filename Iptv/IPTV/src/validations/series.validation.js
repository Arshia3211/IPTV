import Joi from "joi";

export const SeriesValidationSchema = {
  create: {
    body: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().required(),
      releaseDate: Joi.string().required(),
    }),
  },
};
