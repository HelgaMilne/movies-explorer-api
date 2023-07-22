// eslint-disable-next-line no-warning-comments
/* eslint-disable no-console */
const express = require('express');

require('dotenv').config();

const mongoose = require('mongoose');

const helmet = require('helmet');

const cookieParser = require('cookie-parser');

const { errors } = require('celebrate');

const cors = require('./middlewares/cors');

const limiter = require('./middlewares/limiter');

const errorsHandler = require('./middlewares/errorsHandler');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const router = require('./routes');

const { PORT = 3000, PATH_DB, NODE_ENV } = process.env;

const pathDb = NODE_ENV === 'production' ? PATH_DB : 'mongodb://127.0.0.1:27017/testdb';

const app = express();

mongoose.connect(pathDb, {
  useNewUrlParser: true,
})
  .then(() => console.log('Подключили'))
  .catch(() => console.log('Не подключили'));

app.use(cors);
app.use(cookieParser());
app.use(helmet());
app.use(express.json());

app.use(requestLogger);
app.use(limiter);

app.use(router);

app.use(errorLogger);

app.use(errors());
app.use(errorsHandler);

app.listen(PORT, () => console.log(`Слушаю порт: ${PORT}`));
