const express = require('express');
const router = express.Router();

const itemController = require('../controllers/itemController');
//const valid = require('../models/Item');---Unsure if we need this

router.get('/', itemController.getAll);

router.get('/:id', itemController.getSingle);

router.post('/', itemController.createItem);

router.put('/:id', itemController.updateItem);

router.delete('/:id', itemController.deleteItem);

module.exports = router;