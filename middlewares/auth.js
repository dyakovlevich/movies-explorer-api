const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../utils/config');
const UnauthorizedError = require('../errors/UnauthorizedError');

const {
  accessErrorMessage,
  accessTokenErrorMessage,
} = require('../utils/config');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next(new UnauthorizedError(accessTokenErrorMessage));
  }
  let payload;

  try {
    payload = jwt.verify(token, jwtSecret);
  } catch (err) {
    return next(new UnauthorizedError(accessErrorMessage));
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  return next(); // пропускаем запрос дальше
};
