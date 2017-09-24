var express = require('express'),
mongoose = require('mongoose'),
path = require('path');
bodyParser = require('body-parser'),
subtract = require('./lib/subtract'),
app = express();
var port = 3000;

//db connection
const config = require('./config/database');
mongoose.connect(config.database);
mongoose.connection.on('connected',function(req,res){
  console.log('connected to mongodn'+config.database);
});

//bodyparser middleware
//used to parse req body
app.use(bodyParser.json());

//routes to users
const users = require('./routes/users');
app.use('/users',users);




//static folder for client
app.use(express.static(path.join(__dirname, 'public')));
//create a folder public


app.use(function(req, res, next){
  var a = parseInt(req.query.a),
  b = parseInt(req.query.b);
  if (!a || !b || isNaN(a) || isNaN(b)){
    return res.status(422).end("You must specify two numbers as query params, A and B");
  }
  req.a = a;
  req.b = b;
  return next();
});
app.get('/add', require('./routes/add'));
app.get('/subtract', require('./routes/subtract'));

app.listen(port, function(){
  console.log('App is now listening');
});
module.exports = app;