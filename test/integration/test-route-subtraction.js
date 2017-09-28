var supertest = require('supertest'),
assert = require('assert'),
app = require('../../app.js');

exports.addition_should_respond_with_a_numeric_result = function(done){
  supertest(app)
  .get('/subtract?a=5&b=4')
  .expect(200)
  .end(function(err, response){
    assert.ok(!err);
    assert.ok(typeof response.body.result === 'number');
    return done();
  });
};