const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const ValidationError = require('../errors/ValidationError');
// const NotFoundError = require('../../errors/not-found-error');
// const CastError = require('../../errors/cast-error');
// const RulesError = require('../../errors/rules-error');

module.exports.getAllMovies = (req, res, next) => {
  Movie.find({})
    .then((movie) => res.send(movie))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    .then((movie) => res.send({ movie }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return next(new ValidationError('Переданы некорректные данные фильма'));
      }
      return next(err);
    });
};

module.exports.deleteMovieById = (req, res, next) => {
  const deleteMovie = () => {
    Movie.findByIdAndRemove(req.params._id)
      .then((movie) => res.send(movie))
      .catch(next);
  };

  Movie.findById(req.params._id)
    .then((movie) => {
      if (!movie) {
        return next(new NotFoundError('Фильма не существует'));
      }
      if (req.user._id === movie.owner.toString()) {
        return deleteMovie();
      }
      return next(new ForbiddenError('Вы не являетесь владельцем фильма'));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new ValidationError('Передан некорректный _id фильма'));
      }
      return next(err);
    });
};
