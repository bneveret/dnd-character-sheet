const express = require('express');
const passport = require('passport');
const router = express.Router();

const authorized = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.status(401).json({ message: 'Unauthorized' });
    setTimeout(() => {
        // runs after 3 seconds
      }, 3000);//wait
      window.location.replace("https://mythsmith.onrender.com/auth/login");//redirect
  };

router.use('/auth', require('./auth'));
router.use('/users', authorized, require('./users'));
router.use('/characters', authorized, require('./characters'));
router.use('/classes', authorized, require('./classes'));
router.use('/items', authorized, require('./items'));
router.use('/api-docs', authorized, require('./swagger'));

module.exports = router;