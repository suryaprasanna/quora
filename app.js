var express = require('express'),
app = express();
var mongoose = require('mongoose');
const config = require('./config/database');

// Connect to mongoDB
mongoose.connect(config.database, { useMongoClient: true });
mongoose.connection.on('connected', function(req,res) {
  console.log('connected to mongodb ' + config.database);
});


const userController = require('./controller/user_controller');
const questionController = require('./controller/question_controller');
const answerController = require('./controller/answer_controller');

const bp = require('body-parser');
app.use(bp.json());

// All the /users are routed to userController.
app.use('/users', userController);
app.use('/question', questionController);
app.use('/answer', answerController);

app.listen(3000, function(){
  console.log('App is now listening');
});
module.exports = app;