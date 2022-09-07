const router = require('express').Router();
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

const { login, createUser, signOut } = require('../controllers/users');
const { validateLogin, validateCreateUser } = require('../utils/validationAuth');

const userRoutes = require('./users');
const movieRoutes = require('./movies');

router.post('/signin', validateLogin, login);
router.post('/signup', validateCreateUser, createUser);

router.use(auth);

router.delete('/signout', signOut);
router.use('/users', userRoutes);
router.use('/movies', movieRoutes);

router.all('*', (req, res, next) => next(new NotFoundError('Не найдено.')));

module.exports = { router };
