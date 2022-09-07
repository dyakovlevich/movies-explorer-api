require('dotenv').config();

const {
  NODE_ENV,
  JWT_SECRET,
  PORT,
  DATABASE,
} = process.env;

const port = NODE_ENV === 'production' ? PORT : 3001;
const database = NODE_ENV === 'production' ? DATABASE : 'mongodb://127.0.0.1:27017/moviesdb';
const jwtSecret = NODE_ENV === 'production' ? JWT_SECRET : 'dev_secret';

module.exports = {
  port,
  database,
  jwtSecret,
};
