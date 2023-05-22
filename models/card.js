const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema({
  name: { //имя карточки
    type: String, // name — это строка
    required: true, // оно должно быть у каждого пользователя, так что имя — обязательное поле
    minlength: 2, // минимальная длина имени — 2 символа
    maxlength: 30, // а максимальная — 30 символов
  },
  link: { // ссылка на картинку
    type: String, // link — это строка
    required: true, // обязательное поле
    validate: {//проверьте, является ли строка URL-адресом. 
      validator: (link) => validator.isURL(link),//validator - функция проверки данных.
      message: 'Некорректный URL адрес',// когда validator вернёт false, будет использовано это сообщение
    },
  },
  owner: { //ссылка на модель автора карточки
    type: mongoose.Schema.Types.ObjectId, //тип ObjectId
    ref: 'user',
    required: true, // обязательное поле
  },
  // Массивы нужны для хранения однотипных данных, поэтому описание схемы массива сводится к описанию шаблона элемента:
  likes: [{ //список лайкнувших пост пользователей
    type: mongoose.Schema.Types.ObjectId, //массив ObjectId
    ref: 'user',
    default: [], //по умолчанию — пустой массив (поле default);
  }],
  createdAt: { // дата создания
    type: Date, //тип Date
    default: Date.now //значение по умолчанию Date.now
  },
}, { versionKey: false }
)

// создаём модель и экспортируем её
module.exports = mongoose.model('card', cardSchema);

// Мы передали методу mongoose.model два аргумента: имя модели и схему, которая описывает будущие документы.
// Аккуратно — тут можно запутаться. Первый аргумент — имя модели — должно быть существительным в единственном числе. Но Compass отображает его во множественном. Дело в том, что Mongoose автоматически добавляет букву "s" в конце имени коллекции