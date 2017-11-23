const express = require('express');
var router = express.Router();



var Topics = require('../routes/topics');
router.post('/create', Topics.createTopic);
router.get('/get', Topics.getTopic);
router.get('/all', Topics.getTopics);


module.exports = router;