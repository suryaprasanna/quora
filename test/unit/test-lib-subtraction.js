var assert = require('assert'),
subtract = require('../../lib/subtract');

exports.it_should_subtract_two_numbers = function(done){
  var result = subtract(5,4);
  assert.ok(result === 1);
  return done();
};

exports.it_should_subtract_two_negative_numbers = function(done){
  var result = subtract(-4,-2);
  assert.ok(result === -2);
  return done();
};
