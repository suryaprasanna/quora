var assert = require('assert'),
add = require('../../lib/add');

exports.it_should_add_two_numbers = function(done){
  var result = add(1,1);
  assert.ok(result === 2);
  return done();
};

exports.it_should_add_two_negative_numbers = function(done){
  var result = add(-2,-2);
  assert.ok(result === -4);
  return done();
};
