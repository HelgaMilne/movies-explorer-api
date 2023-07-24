require('dotenv').config();

const {
  PORT, PATH_DB, JWT_SECRET_KEY, NODE_ENV,
} = process.env;

const DEV_PORT = 3000;
const DEV_PATH_DB = 'mongodb://127.0.0.1:27017/testdb';
const DEV_JWT_SECRET_KEY = 'some-secret-key';

const DB = NODE_ENV === 'production' && PATH_DB ? PATH_DB : DEV_PATH_DB;
const SERVER_PORT = NODE_ENV === 'production' && PORT ? PORT : DEV_PORT;
const SECRET_KEY = NODE_ENV === 'production' && JWT_SECRET_KEY ? JWT_SECRET_KEY : DEV_JWT_SECRET_KEY;
const SECURE_STATUS = NODE_ENV === 'production';

module.exports = {
  DB,
  SERVER_PORT,
  SECRET_KEY,
  SECURE_STATUS,
};
