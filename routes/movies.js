const router = require('express').Router();
const { getAllMovies, createMovie, deleteMovieById } = require('../controllers/movies');
const { validateCreateMovie, validateDeleteMovie } = require('../utils/validationMovies');

router.get('/', getAllMovies);
router.post('/', validateCreateMovie, createMovie);
router.delete('/:_id', validateDeleteMovie, deleteMovieById);

module.exports = router;
