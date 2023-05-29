const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');

const router = require('./routes');
const handlerError = require('./middlewares/error');

const { PORT = 3000, DB_ADDRESS = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();

mongoose.connect(DB_ADDRESS, {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(cookieParser());

app.use(router);

app.use(handlerError);
app.use(errors());

app.listen(PORT);
