const { celebrate, Joi } = require('celebrate');
const { RegExp } = require('../../utils/Constants');

const validatorCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(RegExp),
  }),
});

const validatorCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
});

module.exports = {
  validatorCreateCard,
  validatorCardId,
};
