const express = require('express');
const passport = require('passport');
const router = express.Router();

const itemController = require('../controllers/itemController');
const valid = require('../models/Item');

//router.use(passport.authenticate('github', { scope: ['user:email'] }));
router.get('/', itemController.getAll);

router.get('/:id', itemController.getSingle);

router.post('/', valid.rules, itemController.createItem);

router.put('/:id', valid.rules, itemController.updateItem);

router.delete('/:id', itemController.deleteItem);

module.exports = router;