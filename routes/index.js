const router = require('express').Router();
const {
  NOT_FOUND
} = require('../utils/Constants');

router.use('*', (res) => res.status(NOT_FOUND).send({ message: 'Запрашиваемой страницы не существует' }));

module.exports = router;