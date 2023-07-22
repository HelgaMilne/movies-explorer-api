const router = require('express').Router();

const { signinValidation, signupValidation } = require('../middlewares/validatons');

const auth = require('../middlewares/auth');

const { logIn, logOut, createUser } = require('../controllers/users');

const NotFoundError = require('../errors/not-found-err');

const { notFoundErrorPageMessage } = require('../utils/constants');

router.post('/signin', signinValidation, logIn);

router.post('/signup', signupValidation, createUser);

router.get('/signout', logOut);

router.use(auth);

router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

router.use('/*', (req, res, next) => {
  next(new NotFoundError(notFoundErrorPageMessage));
});

module.exports = router;
