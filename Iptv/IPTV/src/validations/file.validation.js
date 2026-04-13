import joi from "joi";

export const FileValidationSchema = {
  create: {
    body: joi
      .object({
        filename: joi.string().required(),
        path: joi.string().required(),
        size: joi.number().required(),
        uploadedAt: joi.date(),
      })
      .required(),
  },
  update: {
    body: joi
      .object({
        filename: joi.string(),
        path: joi.string(),
        size: joi.number(),
        uploadedAt: joi.date(),
      })
      .min(1)
      .required(),
  },
};