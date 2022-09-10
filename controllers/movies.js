const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const ValidationError = require('../errors/ValidationError');

const {
  wrongIdErrorMessage,
  wrongDataErrorMessage,
  notFoundMovieErrorMessage,
  accessMovieErrorMessage,
} = require('../utils/config');

module.exports.getAllMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
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
        return next(new ValidationError(wrongDataErrorMessage));
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
        return next(new NotFoundError(notFoundMovieErrorMessage));
      }
      if (req.user._id === movie.owner.toString()) {
        return deleteMovie();
      }
      return next(new ForbiddenError(accessMovieErrorMessage));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new ValidationError(wrongIdErrorMessage));
      }
      return next(err);
    });
};
