import joi from "joi";
export const StreamValidationSchema = {
  create: {
    body: joi.object().keys({ 
      episodeId: joi.string().required(),
      quality: joi.string().required(),
      streamingPlatform: joi.string().required(),
      title : joi.string().required(),
    }),
  },
};