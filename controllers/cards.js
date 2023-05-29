const Card = require('../models/card');

const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user;
  Card.create({ name, link, owner })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные при создании карточки'));
      }
      return next(err);
    });
};

module.exports.deleteCardById = (req, res, next) => {
  const { cardId } = req.params;
  const { _id } = req.user;

  Card.findById(cardId)
    .orFail(new NotFoundError('Такой карточки нет'))
    .then((card) => {
      if (card.owner.toString() !== _id) {
        throw new ForbiddenError('Нельзя удалять карточки');
      }
      return Card.findByIdAndRemove(cardId)
        .then(() => res.status(200).send({ message: 'Карточка удалена' }));
    })
    .catch((err) => {
      // if (err.name === 'DocumentNotFoundError') {
      //   return res.status(NOT_FOUND).send({ message: 'Такой карточки нет' });
      // }
      if (err.name === 'CastError') {
        return next(new BadRequestError('Некорректный _id карточки'));
      }
      return next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
  const { cardId } = req.params;
  const { _id } = req.user;

  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: _id } }, { new: true })
    .populate(['owner', 'likes'])
    .orFail()
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка по указанному _id не найдена');
      }
      res.status(200).send({ data: card });
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  const { cardId } = req.params;
  const { _id } = req.user;

  Card.findByIdAndUpdate(cardId, { $pull: { likes: _id } }, { new: true })
    .populate(['owner', 'likes'])
    .orFail()
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка по указанному _id не найдена');
      }
      res.status(200).send({ data: card });
    })
    .catch(next);
};
