var express = require('express');
var router = express.Router();



var Answers = require('../routes/answers');
router.post('/put', Answers.putAnswer);
router.post('/edit', Answers.editAnswer);
// router.get('/getanswers', Answers.getAnswers);
router.post('/upvote', Answers.upvote);
router.post('/downvote', Answers.downvote);


module.exports = router;