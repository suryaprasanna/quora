var express = require('express'),
app = express();
var mongoose = require('mongoose');
const config = require('./config/test_database');

// Connect to mongoDB
mongoose.connect(config.database, { useMongoClient: true });
mongoose.connection.on('connected', function(req,res) {
  console.log('connected to mongodb ' + config.database);
});


const userController = require('./controller/user_controller');
const questionController = require('./controller/question_controller');
const answerController = require('./controller/answer_controller');
const searchController = require('./controller/search_controller');
const topicController = require('./controller/topic_controller');
const commentController = require('./controller/comment_controller');
const followController = require('./controller/follow_controller');
const unfollowController = require('./controller/unfollow_controller');

const bp = require('body-parser');
app.use(bp.json());

// var aa = require('./data/questions.js');
// aa.getQuestion("5a1b414706d27548190c2841");


app.use('/users', userController);
app.use('/question', questionController);
app.use('/answer', answerController);
app.use('/search', searchController);
app.use('/topic', topicController);
app.use('/comment', commentController);
app.use('/follow', followController);
app.use('/unfollow', unfollowController);


app.listen(3000, function(){
  console.log('App is now listening');
});
module.exports = app;