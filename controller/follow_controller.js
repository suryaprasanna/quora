const express = require('express');
var router = express.Router();


var Follow = require('../routes/follows');
router.post('/question', Follow.followQuestion);
router.post('/topic', Follow.followTopic);
router.post('/user', Follow.followUser);

module.exports = router;