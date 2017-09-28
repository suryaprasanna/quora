var assert = require('assert'),
add = require('../../lib/add');

exports.validate_get_request_with_positive_inputs = function(done){
  var result = add(1,1);
  assert.ok(result === 2);
  return done();
};

exports.validate_get_request_with_negative_inputs = function(done){
  var result = add(-2,-2);
  assert.ok(result === -4);
  return done();
};