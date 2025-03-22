const express = require('express');
const router = express.Router();

const characterController = require('../controllers/characterController');
const valid = require('../models/Character');

router.get('/', characterController.getAll);

router.get('/:id', characterController.getSingle);

router.post('/', valid.rules, characterController.createCharacter);

router.put('/:id', valid.rules, characterController.updateCharacter);

router.delete('/:id', characterController.deleteCharacter);

module.exports = router;