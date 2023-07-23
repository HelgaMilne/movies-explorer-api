const createdCode = 201;
const badRequestErrorCode = 400;
const unauthorizedErrorCode = 401;
const forbiddenErrorCode = 403;
const notFoundErrorCode = 404;
const conflictErrorCode = 409;
const internalServerErrorCode = 500;
const duplicateKeyErrorCode = 11000;

const badRequestErrorMessage = 'Вы ввели некорректные данные!';
const unauthorizedErrorMessage = 'Неправильные почта или пароль!';
const welcomeErrorMessage = 'Необходимо авторизироваться!';
const forbiddenErrorMessage = 'Нет прав на удаление фильма!';
const notFoundErrorUserMessage = 'Такой пользователь не найден!';
const notFoundErrorMovieMessage = 'Такой фильм не найден!';
const notFoundErrorPageMessage = 'Такой страницы не существует!';
const conflictErrorUserMessage = 'Такой пользователь уже существует!';
const conflictErrorEmailMessage = 'Такой email уже существует!';
const conflictErrorMovieMessage = 'Такой фильм уже существует!';
const internalServerErrorMessage = 'На сервере произошла ошибка!';
const signoutMessage = 'Пользователь вышел!';

module.exports = {
  createdCode,
  badRequestErrorCode,
  unauthorizedErrorCode,
  welcomeErrorMessage,
  forbiddenErrorCode,
  notFoundErrorCode,
  conflictErrorCode,
  internalServerErrorCode,
  duplicateKeyErrorCode,
  badRequestErrorMessage,
  unauthorizedErrorMessage,
  forbiddenErrorMessage,
  notFoundErrorUserMessage,
  notFoundErrorMovieMessage,
  notFoundErrorPageMessage,
  conflictErrorUserMessage,
  conflictErrorEmailMessage,
  conflictErrorMovieMessage,
  internalServerErrorMessage,
  signoutMessage,
};
