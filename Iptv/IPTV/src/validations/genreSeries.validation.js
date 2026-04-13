import joi from "joi";
export const GenreSeriesValidationSchema = {
  create: joi.object().keys({
    genreId: joi.string().required(),
    seriesId: joi.string().required(),
  }),
  update: joi.object().keys({
    genreId: joi.string().optional(),
    seriesId: joi.string().optional(),
  }),
};  