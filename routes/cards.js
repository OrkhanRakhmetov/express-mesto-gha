const cardRouter = require('express').Router();

const {
  getCards, createCard, deleteCardById, likeCard, dislikeCard,
} = require('../controllers/cards');

const {
  validatorCreateCard,
  validatorCardId,
} = require('../middlewares/validators/cards');

cardRouter.get('/', getCards);
cardRouter.post('/', validatorCreateCard, createCard);
cardRouter.delete('/:cardId', validatorCardId, deleteCardById);
cardRouter.put('/:cardId/likes', validatorCardId, likeCard);
cardRouter.delete('/:cardId/likes', validatorCardId, dislikeCard);

module.exports = cardRouter;
