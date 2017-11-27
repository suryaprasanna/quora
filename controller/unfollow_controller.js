const express = require('express');
var router = express.Router();


var Follow = require('../routes/follows');
router.post('/question', Follow.unfollowQuestion);
router.post('/topic', Follow.unfollowTopic);
router.post('/user', Follow.unfollowUser);

module.exports = router;