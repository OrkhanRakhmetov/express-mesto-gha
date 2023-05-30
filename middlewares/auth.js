const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next(new UnauthorizedError('с токеном что-то не так'));
  }

  let payload;

  try {
    payload = jwt.verify(token, 'super-strong-secret-key');
  } catch (err) {
    return next(new UnauthorizedError('с токеном что-то не так'));
  }

  req.user = payload;

  return next();
};

module.exports = auth;
