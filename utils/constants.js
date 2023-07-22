const createdCode = 201;
const badRequestErrorCode = 400;
const unauthorizedErrorCode = 401;
const forbiddenErrorCode = 403;
const notFoundErrorCode = 404;
const conflictErrorCode = 409;
const internalServerErrorCode = 500;

const badRequestErrorMessage = 'Вы ввели некорректные данные!';
const unauthorizedErrorMessage = 'Неправильные почта или пароль!';
const welcomeErrorMessage = 'Необходимо авторизироваться!';
const forbiddenErrorMessage = 'Нет прав на удаление фильма!';
const notFoundErrorUserMessage = 'Такой пользователь не найден!';
const notFoundErrorMovieMessage = 'Такой фильм не найден!';
const notFoundErrorPageMessage = 'Такой страницы не существует!';
const conflictErrorMessage = 'Такой пользователь уже существует!';
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
  badRequestErrorMessage,
  unauthorizedErrorMessage,
  forbiddenErrorMessage,
  notFoundErrorUserMessage,
  notFoundErrorMovieMessage,
  notFoundErrorPageMessage,
  conflictErrorMessage,
  internalServerErrorMessage,
  signoutMessage,
};
