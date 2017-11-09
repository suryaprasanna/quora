const express = require('express');
var router = express.Router();


var Search = require('../routes/search');
router.get('/question', Search.searchQuery);


module.exports = router;