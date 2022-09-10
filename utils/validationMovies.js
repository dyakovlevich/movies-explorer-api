const { celebrate, Joi } = require('celebrate');
const isUrl = require('validator/lib/isURL');

const {
  wrongUrlFormatErrorMessage,
} = require('./config');

const validateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom((value, helpers) => {
      if (isUrl(value)) {
        return value;
      }
      return helpers.message(wrongUrlFormatErrorMessage);
    }),
    trailerLink: Joi.string().required().custom((value, helpers) => {
      if (isUrl(value)) {
        return value;
      }
      return helpers.message(wrongUrlFormatErrorMessage);
    }),
    thumbnail: Joi.string().required().custom((value, helpers) => {
      if (isUrl(value)) {
        return value;
      }
      return helpers.message(wrongUrlFormatErrorMessage);
    }),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const validateDeleteMovie = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().length(24).hex().required(),
  }),
});

module.exports = {
  validateCreateMovie,
  validateDeleteMovie,
};
