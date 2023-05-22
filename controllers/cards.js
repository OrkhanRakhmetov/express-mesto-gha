const Card = require('../models/card');

const {
  BAD_REQUEST,
  FORBIDDEN,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR
} = require('../utils/Constants');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send({ data: cards }))
    .catch(() => res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user;
  Card.create({ name, link, owner })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные при создании карточки' });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
    });
};

module.exports.deleteCardById = (req, res) => {
  const { cardId } = req.params;
  const { _id } = req.user;

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND).send({ message: 'Такой карточки нет' });
      }
      if (card.owner.toString() !== _id) {
        return res.status(FORBIDDEN).send({ message: 'Нельзя удалять карточки' });
      }
      return Card.findByIdAndRemove(cardId)
        .then(() => res.status(200).send({ message: 'Карточка удалена' }));
    })
    .catch(() => res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' }));
};

module.exports.likeCard = (req, res) => {
  const { cardId } = req.params;
  const { _id } = req.user;

  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: _id } }, { new: true })
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND).send({ message: 'Такой карточки нет' });
      }
      res.status(200).send({ data: card });
    })
    .catch(() => res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' }));
};

module.exports.dislikeCard = (req, res) => {
  const { cardId } = req.params;
  const { _id } = req.user;

  Card.findByIdAndUpdate(cardId, { $pull: { likes: _id } }, { new: true })
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND).send({ message: 'Такой карточки нет' });
      }
      res.status(200).send({ data: card });
    })
    .catch(() => res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' }));
};
