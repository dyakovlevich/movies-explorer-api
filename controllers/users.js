const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { jwtSecret } = require('../utils/config');

const NotFoundError = require('../errors/NotFoundError');
const DuplicateError = require('../errors/DuplicateError');
const ValidationError = require('../errors/ValidationError');

const {
  wrongIdErrorMessage,
  wrongDataErrorMessage,
  duplicateUserEmailErrorMessage,
  notFoundUserErrorMessage,
} = require('../utils/config');

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => {
      const userObj = user.toObject();
      delete userObj.password;
      res.send(userObj);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError(wrongDataErrorMessage));
      }
      if (err.code === 11000) {
        return next(new DuplicateError(duplicateUserEmailErrorMessage));
      }
      return next();
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, jwtSecret, {
        expiresIn: '7d',
      });
      res.cookie('jwt', token, {
        maxAge: 3600000,
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      });
      res.send({ token });
    })
    .catch(next);
};

module.exports.signOut = (req, res) => {
  res.clearCookie('jwt', {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  })
    .send({ message: 'Cookies clean' });
};

module.exports.getCurrentUser = (req, res, next) => {
  const { _id } = req.user;
  User.find({ _id })
    .then((user) => {
      if (!user) {
        return next(new NotFoundError(notFoundUserErrorMessage));
      }
      return res.send(...user);
    })
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        return next(new NotFoundError(notFoundUserErrorMessage));
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new DuplicateError(duplicateUserEmailErrorMessage));
      }
      if (err.name === 'CastError') {
        return next(new ValidationError(wrongIdErrorMessage));
      }
      if (err.name === 'ValidationError') {
        return next(new ValidationError(wrongDataErrorMessage));
      }
      return next(err);
    });
};
