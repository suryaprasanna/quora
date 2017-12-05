//var supertest = require('supertest'),
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var chai = require('chai');
var app = require('../../test_app');

var expect = require('chai').expect;
chai.use(require('chai-http'));

var request = require('request');
var sleep = require('system-sleep');
var should = require('should');

const User = require('../../model/user');

describe('Router test cases', function(){
	 //before(function (done) {
///
 //       postRequest(function () {
//
//            done();
//
//        });
//    });

	var user_id = '';

	it('User Registration', function(done){
		chai.request('http://localhost:3000/users/signup')
		.post('/')
		.send({
			"name":"prasanna",
   			"email":"prasanna",
   			"username":"prasanna",
   			"password":"prasanna"
		})
		.end(function(err,res){
			//console.log(res);
			console.log("USER ID is: "+JSON.stringify(res.body));
			expect(res.status).to.be.equal(200);
			user_id = res.body._id;
			
			done();
		});
	});

	it('User Authentication', function(done){
		chai.request('http://localhost:3000/users/login')
		.post('/')
		.send({
   			"username":"prasanna",
   			"password":"prasanna"
		})
		.end(function(err,res){
			//console.log(res);
			expect(res.status).to.be.equal(200);
			done();
		});
	});

	it('Get Questions', function(done){
		chai.request('http://localhost:3000/question/getAll')
		.get('/')
		.end(function(err,res){
			//console.log(res);
			expect(res.status).to.be.equal(200);
			done();
		});
	});

	var ques_id = '';

	it('Post New Question', function(done){
		chai.request('http://localhost:3000/question/ask')
		.post('/')
		.send({
  			"user_id" : user_id,
  			"is_anonymous" : true,
  			"name" : "When did the great war start ?"
		})
		.end(function(err,res){
			//console.log(res);
			ques_id = res.body._id;
			console.log("Question id is: "+ques_id);
			expect(res.status).to.be.equal(200);
			done();
		});
	});

	it('Edit a Question', function(done){
		chai.request('http://localhost:3000/question/edit')
		.post('/')
		.send({
  			"user_id" : user_id,
  			"is_anonymous" : "true", //or false
  			"name" : "When did the great war of the seven kingdoms start ?"
		})
		.end(function(err,res){
			//console.log(res);
			expect(res.status).to.be.equal(200);
			done();
		});
	});

	it('Get UnAnswered Questions', function(done){
		chai.request('http://localhost:3000/question/getUnanswered')
		.get('/')
		.end(function(err,res){
			//console.log(res);
			expect(res.status).to.be.equal(200);
			done();
		});
	});

	//Write get one question api

	it('Post an Answer', function(done){
		chai.request('http://localhost:3000/answer/put')
		.post('/')
		.send({
  			"user_id" : user_id,
    		"is_anonymous" : "true", //or false
    		"name" : "Great war started in 1914 and lasted for 3 years!",
    		"question_id" : ques_id
		})
		.end(function(err,res){
			expect(res.status).to.be.equal(200);
			done();
		});
	});

	after(function(done){
     mongoose.connection.db.dropDatabase(function(){
       mongoose.connection.close(done);
     });
  });
});

// exports.addition_should_accept_numbers = function(done){
//   supertest(app)
//   .get('/add?a=1&b=1')
//   .expect(200)
//   .end(done);
// };

// exports.addition_should_reject_strings = function(done){
//   supertest(app)
//   .get('/add?a=string&b=2')
//   .expect(422)
//   .end(done);
// };