const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: { // имя пользователя
    type: String, // name — это строка
    required: true, // оно должно быть у каждого пользователя, так что имя — обязательное поле
    minlength: 2, // минимальная длина имени — 2 символа
    maxlength: 30, // а максимальная — 30 символов
  },
  about: {//информация о пользователе
    type: String, // about — это строка
    required: true, // оно должно быть у каждого пользователя, так что имя — обязательное поле
    minlength: 2, // минимальная длина строки информации — 2 символа
    maxlength: 30, // а максимальная — 30 символов
  },
  avatar: {//ссылка на аватарку
    type: String,// avatar — это строка
    required: true,// она должна быть у каждого пользователя, так что аватарнка — обязательное поле
    validate: {// validator - функция проверки данных.
      validator: (avatar) => validator.isURL(avatar),
      message: 'Некорректный URL адрес',// когда validator вернёт false, будет использовано это сообщение
    },
  },
}, { versionKey: false }
)

module.exports = mongoose.model('user', userSchema);