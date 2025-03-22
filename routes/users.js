const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const valid = require('../models/User');

router.get('/', userController.getAll);

router.get('/:id', userController.getSingle);

router.post('/', valid.rules, userController.createUser);

router.put('/:id', valid.rules, userController.updateUser);

router.delete('/:id', userController.deleteUser);

module.exports = router;