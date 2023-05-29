const router = require('express').Router();

const auth = require('../middlewares/auth');

const userRouter = require('./users');
const cardRouter = require('./cards');

const {
  validatorCreateUser,
  validatorLogin,
} = require('../middlewares/validators/users');

const NotFoundError = require('../errors/NotFoundError');

const { createUser, login } = require('../controllers/users');

router.post('/signup', validatorCreateUser, createUser);
router.post('/signin', validatorLogin, login);
router.use('/users', auth, userRouter);
router.use('/cards', auth, cardRouter);

router.use('*', auth, (req, res, next) => next(new NotFoundError('Такой страницы не существует')));

module.exports = router;
