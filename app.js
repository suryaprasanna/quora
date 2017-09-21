var express = require('express'),
subtract = require('./lib/subtract'),
app = express();

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

app.listen(3000, function(){
  console.log('App is now listening');
});
module.exports = app;
