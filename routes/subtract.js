var subtract = require('../lib/subtract');
module.exports = function(req, res, next){
  return res.json({ result : subtract(req.a, req.b) });
};