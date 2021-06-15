import * as Joi from 'joi';

export const validationSchema = Joi.object({
  PORT: Joi.number().default(8080),
  DB_URI: Joi.string().default('mongodb://localhost'),
  DB_NAME: Joi.string().default('developmentDB'),
  DB_URI_TEST: Joi.string().default('mongodb://localhost'),
  DB_NAME_TEST: Joi.string().default('testDB'),
  JWT_SECRET: Joi.string()
    .required()
    .error(
      new Error('Missing JWT_SECRET env var. Set it and restart the server'),
    ),
  JWT_EXPIRATION_TIME: Joi.string().required(),
  OMDB_API_KEY: Joi.string().required(),
});
