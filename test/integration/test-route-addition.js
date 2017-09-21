var supertest = require('supertest'),
app = require('../../app');

exports.addition_should_accept_numbers = function(done){
  supertest(app)
  .get('/add?a=1&b=1')
  .expect(200)
  .end(done);
};

exports.addition_should_reject_strings = function(done){
  supertest(app)
  .get('/add?a=string&b=2')
  .expect(422)
  .end(done);
};
