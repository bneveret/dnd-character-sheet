const express = require('express');

const router = express.Router();

router.use('/characters', require('./characters'));

router.use('/classes', require('./classes'));

router.use('items', require('./items'));

router.use('users', require('./users'));

router.use('/', require('./swagger'));

module.exports = router;