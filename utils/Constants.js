const BAD_REQUEST = 400;
const FORBIDDEN = 403;
const NOT_FOUND = 404;
const CONFLICT_409 = 409;
const INTERNAL_SERVER_ERROR = 500;

const RegExp = /(https?:\/\/)?[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]\.[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]+/m;

const {
  PORT = 3000,
  DB_ADDRESS = 'mongodb://127.0.0.1:27017/mestodb',
} = process.env;

module.exports = {
  BAD_REQUEST,
  FORBIDDEN,
  NOT_FOUND,
  CONFLICT_409,
  INTERNAL_SERVER_ERROR,
  PORT,
  DB_ADDRESS,
  RegExp,
};
