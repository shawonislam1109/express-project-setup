import Joi from "joi";

export const deleteMultipleFilesSchema = {
  body: Joi.object({
    ids: Joi.array().items(Joi.string().required()).min(1).required(),
  }),
};

export const deleteFileSchema = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
};
