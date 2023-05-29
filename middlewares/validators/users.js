const { celebrate, Joi } = require('celebrate');
const { RegExp } = require('../../utils/Constants');

const validatorCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(RegExp),
  }),
});

const validatorUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
});

const validatorLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const validatorUpdateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const validatorUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(RegExp),
  }),
});

module.exports = {
  validatorUserId,
  validatorCreateUser,
  validatorLogin,
  validatorUpdateProfile,
  validatorUpdateAvatar,
};
