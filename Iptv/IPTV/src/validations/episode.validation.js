import Joi from "joi";

export const EpisodeValidationSchema = {
  create: {
    body: Joi.object().keys({
      // name: Joi.string().required(),
      episodeNumber: Joi.string().required(),
      title: Joi.string().required(),
      seasonId: Joi.string().required(),
      seasonNumber: Joi.string().required(),
      duration: Joi.string().required(),
    }),
  },
};
