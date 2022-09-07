const mongoose = require('mongoose');
const isUrl = require('validator/lib/isURL');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator: (v) => isUrl(v),
        message: 'Неверный формат url',
      },
    },
    trailerLink: {
      type: String,
      required: true,
      validate: {
        validator: (v) => isUrl(v),
        message: 'Неверный формат url',
      },
    },
    thumbnail: {
      type: String,
      required: true,
      validate: {
        validator: (v) => isUrl(v),
        message: 'Неверный формат url',
      },
    },
    owner: {
      type: mongoose.ObjectId,
      required: true,
    },
    movieId: {
      type: Number,
      required: true,
    },
    nameRU: {
      type: String,
      required: true,
    },
    nameEN: {
      type: String,
      required: true,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('movie', movieSchema);
