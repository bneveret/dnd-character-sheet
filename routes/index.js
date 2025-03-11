const express = require('express');

const router = express.Router();

router.use('/users', require('./users'));
router.use('/characters', require('./characters'));
router.use('/classes', require('./users'));
router.use('/items', require('./items'));
router.use('/api-docs', require('./swagger'));

module.exports = router;