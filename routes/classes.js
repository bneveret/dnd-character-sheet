const express = require('express');
const passport = require('passport');
const router = express.Router();

const classController = require('../controllers/classController');
const valid = require('../models/Class'); 

//router.use(passport.authenticate('github', { scope: ['user:email'] }));

router.get('/', classController.getAll);

router.get('/:id', classController.getSingle);

router.post('/', valid.rules, classController.createClass);

router.put('/:id', valid.rules, classController.updateClass);

router.delete('/:id', classController.deleteClass);

module.exports = router;