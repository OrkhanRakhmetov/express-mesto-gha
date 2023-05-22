const User = require('../models/user');

const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR
} = require('../utils/Constants');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send(user))
    .catch(() => res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => res.send({ data: user }))

    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(NOT_FOUND).send({ message: 'Пользователь по указанному _id не найден' });
      }
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST).send({ message: 'Некорректный _id пользователя' });
      }
      res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
    })
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные при создании пользователя' });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { name, about }, { runValidators: true, new: true })
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные при создании пользователя' });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { avatar }, { runValidators: true, new: true })
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch(() => res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' }));
};



