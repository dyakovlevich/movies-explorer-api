const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { router } = require('./routes');
const errorHandler = require('./errors/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./utils/limiter');

const { port, database } = require('./utils/config');

const app = express();

app.use(cors());

// app.use(
//   cors({
//     origin: [
//       'https://kinopoisk.nomoredomains.sbs',
//       'http://localhost:3000',
//       'localhost:3000',
//     ],
//     methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
//     allowedHeaders: ['Authorization', 'Content-Type'],
//     credentials: true,
//   }),
// );

app.use(helmet());
app.use(requestLogger);
app.use(limiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect(database, {
  // useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false
});

// подключаем роуты
app.use('/', router);

// подключаем логгер ошибок
app.use(errorLogger);

// обработчики ошибок
app.use(errors());

// наш централизованный обработчик
app.use(errorHandler);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
