// eslint-disable-next-line no-warning-comments
/* eslint-disable no-console */
const express = require('express');

const mongoose = require('mongoose');

const helmet = require('helmet');

const cookieParser = require('cookie-parser');

const { errors } = require('celebrate');

const cors = require('./middlewares/cors');

const limiter = require('./middlewares/limiter');

const errorsHandler = require('./middlewares/errorsHandler');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const router = require('./routes');

const { DB, SERVER_PORT } = require('./utils/config');

const app = express();

mongoose.connect(DB, {
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

app.listen(SERVER_PORT, () => console.log(`Слушаю порт: ${SERVER_PORT}`));
