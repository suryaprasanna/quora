const express = require('express');
var router = express.Router();

var UserUtil = require('../data/users');
var User = require('../model/user');

var Signup = require('../routes/signup');
router.post('/signup', Signup.postUser);

var Questions = require('../routes/questions');
router.post('/questions', Questions.askQuestion);

//var getQuestions = require('../routes/questions')
router.get('/getquestions', Questions.getQuestions);

module.exports = router;