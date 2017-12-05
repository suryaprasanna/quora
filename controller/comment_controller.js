var express = require('express');
var router = express.Router();



var Comments = require('../routes/comments');
router.post('/question', Comments.commentOnQues);
router.post('/answer', Comments.commentOnAns);


module.exports = router;