const express = require('express');
const passport = require('passport');
const router = express.Router();

const userController = require('../controllers/userController');
const valid = require('../models/User');

router.use(passport.authenticate('oauth-bearer', { session: false }));

router.get('/', userController.getAll);

router.get('/:id', userController.getSingle);

router.post('/', valid.rules, userController.createUser);

router.put('/:id', valid.rules, userController.updateUser);

router.delete('/:id', userController.deleteUser);

module.exports = router;