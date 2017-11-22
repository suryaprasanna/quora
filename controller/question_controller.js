const express = require('express');
var router = express.Router();



var Questions = require('../routes/questions');
router.post('/ask', Questions.askQuestion);
router.post('/edit', Questions.editQuestion);

router.post('/upvote', Questions.upvote);
router.post('/downvote', Questions.downvote);

router.get('/get', Questions.getQuestion);
router.get('/getAll', Questions.getQuestions);


module.exports = router;