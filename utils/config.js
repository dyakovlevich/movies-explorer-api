require('dotenv').config();

const {
  NODE_ENV,
  JWT_SECRET,
  PORT,
  DATABASE,
} = process.env;

exports.port = NODE_ENV === 'production' ? PORT : 3001;
exports.database = NODE_ENV === 'production' ? DATABASE : 'mongodb://127.0.0.1:27017/moviesdb';
exports.jwtSecret = NODE_ENV === 'production' ? JWT_SECRET : 'dev_secret';

exports.wrongDataErrorMessage = 'Переданы некорректные данные';
exports.duplicateUserEmailErrorMessage = 'Пользователь с данным e-mail уже существует';
exports.notFoundUserErrorMessage = 'Пользователь не найден';
exports.wrongIdErrorMessage = 'Передан некорректный _id';
exports.notFoundMovieErrorMessage = 'Фильма не существует';
exports.accessMovieErrorMessage = 'Вы не являетесь владельцем фильма';
exports.serverErrorMessage = 'Ошибка сервера';
exports.wrongUserDataErrorMessage = 'Неправильные почта или пароль';
exports.wrongEmailFormatErrorMessage = 'Неверный формат почты';
exports.wrongUrlFormatErrorMessage = 'Неверный формат ссылки';
exports.accessErrorMessage = 'Необходима авторизация';
exports.accessTokenErrorMessage = 'Необходима авторизация. Отсутствует токен';
exports.notFoundPageErrorMessage = 'Страница не найдена';
