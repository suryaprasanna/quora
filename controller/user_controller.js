const express = require('express');
var router = express.Router();

var UserUtil = require('../data/users');
var User = require('../model/user');

var Signup = require('../routes/signup');
router.post('/signup', Signup.postUser);

var userLogin = require('../routes/login');
router.post('/login', userLogin.authenticate);


module.exports = router;