const express = require('express');
var router = express.Router();



var Answers = require('../routes/answers');
router.post('/put', Answers.putAnswer);
router.post('/edit', Answers.editAnswer);


module.exports = router;