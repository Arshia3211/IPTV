import Joi from "joi";

export const SeasonValidationSchema = {
  create: {
    body: Joi.object().keys({
      //name: Joi.string().required(),
      seriesId: Joi.string().required(),
      seasonNumber: Joi.number().required(),
      title: Joi.string().required(),
    }),
  },
};
