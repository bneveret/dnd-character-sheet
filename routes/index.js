const express = require('express');
const passport = require('passport');
const router = express.Router();

const authorized = (req, res, next) => {
    if (process.env.NODE_ENV === 'test') return next();
    if (req.isAuthenticated()) return next();
    res.redirect('../auth/login');
  };

router.use('/auth', require('./auth'));
router.use('/users', authorized, require('./users'));
router.use('/characters', authorized, require('./characters'));
router.use('/classes', authorized, require('./classes'));
router.use('/items', authorized, require('./items'));
router.use('/api-docs', authorized, require('./swagger'));

module.exports = router;