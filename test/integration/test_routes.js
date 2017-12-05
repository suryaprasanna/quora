'use strict';
//var supertest = require('supertest'),
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var chai = require('chai');
var app = require('../../test_app');
var handler = require('../../config/es_handler');
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

			 // res.should.have.status(400);
			// console.log("USER ID is: "+JSON.stringify(res.body));
//               expect(res.body.state).to.be.true;
		// res.body.to.have.property('status');



			// expect(res.status).to.be.equal(200);
			// user_id = JSON.parse(res.body)._id;
			// console.log("sds " + user_id);
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

	// it('Post New Question', function(done){
	// 	chai.request('http://localhost:3000/question/ask')
	// 	.post('/')
	// 	// .type('form')
	// 	// .set('content-type', 'application/json')
	// 	.send({
 //  			"user_id" : user_id,
 //  			"is_anonymous" : true,
 //  			"name" : "When did the great war start ?"
	// 	})
	// 	.end(function(err,res){
			

	// 		// ques_id = res.body._id;
	// 		// console.log("Question id is: "+ques_id);
	// 		expect(res.status).to.be.equal(500);
	// 		done();
	// 	});
	// });

	it('Edit a Question', function(done){
		chai.request('http://localhost:3000/question/edit')
		.post('/')
		// .set('content-type', 'application/json')
		.send({
  			"user_id" : user_id,
  			"is_anonymous" : "true", //or false
  			"name" : "When did the great war of the seven kingdoms start ?"
		})
		.end(function(err,res){
			//console.log(res);
			expect(res.status).to.be.equal(400);
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
			expect(res.status).to.be.equal(500);
			done();
		});
	});

	it('Edit an Answer', function(done){
		chai.request('http://localhost:3000/answer/edit')
		.post('/')
		.send({
  			"id" : "5a03e9d1ba9a7a01f2b69c95",
  			"name" : "Great war started in 1914 and lasted for 3 years!",
  			"user_id" : user_id
		})
		.end(function(err,res){
			expect(res.status).to.be.equal(200);
			done();
		});
	});

	it('Follow Question', function(done){
		chai.request('http://localhost:3000/follow/question')
		.post('/')
		.send({
  			"user_id" : "5a1b2b163a7a8835d2343b88",
    		"question_id" : "5a1b4d3d09d1ab4ec671b9d3"
		})
		.end(function(err,res){
			expect(res.status).to.be.equal(200);
			done();
		});
	});

	it('Follow Topic', function(done){
		chai.request('http://localhost:3000/follow/topic')
		.post('/')
		.send({
  			"user_id" : "5a1b2b163a7a8835d2343b88",
    		"topic_id" : "5a1b271cfc2b9c32c37d13ed"
		})
		.end(function(err,res){
			expect(res.status).to.be.equal(200);
			done();
		});
	});

	it('Follow User', function(done){
		chai.request('http://localhost:3000/follow/user')
		.post('/')
		.send({
  			"follow_user_id" : "5a1b2b163a7a8835d2343b88",
    		"user_id" : "5a1b2ef599e41137eb531553"
		})
		.end(function(err,res){
			expect(res.status).to.be.equal(200);
			done();
		});
	});

	it('Unfollow Question', function(done){
		chai.request('http://localhost:3000/unfollow/question')
		.post('/')
		.send({
  			"user_id" : "5a1b2b163a7a8835d2343b88",
    		"unfollow_question_id" : "5a1b4d3d09d1ab4ec671b9d3"
		})
		.end(function(err,res){
			expect(res.status).to.be.equal(200);
			done();
		});
	});

	it('Unfollow Topic', function(done){
		chai.request('http://localhost:3000/unfollow/topic')
		.post('/')
		.send({
  			"user_id" : "5a1b2b163a7a8835d2343b88",
    		"unfollow_topic_id" : "5a1b271cfc2b9c32c37d13ed"
		})
		.end(function(err,res){
			expect(res.status).to.be.equal(200);
			done();
		});
	});

	it('Unfollow User', function(done){
		chai.request('http://localhost:3000/unfollow/user')
		.post('/')
		.send({
  			"user_id" : "5a1b2b163a7a8835d2343b88",
    		"unfollow_user_id" : "5a1b2ef599e41137eb531553"
		})
		.end(function(err,res){
			expect(res.status).to.be.equal(200);
			done();
		});
	});

	it('Comment on Question', function(done){
		chai.request('http://localhost:3000/comment/question')
		.post('/')
		.send({
  			"user_id" : "5a1cb3ef8b9b2103f6cce1a9",
    		"question_id": "5a1cb4b38b9b2103f6cce1aa",
    		"comment" : "do i have to give full name?"
		})
		.end(function(err,res){
			expect(res.status).to.be.equal(200);
			done();
		});
	});

	it('Comment on Answer', function(done){
		chai.request('http://localhost:3000/comment/answer')
		.post('/')
		.send({
  			"user_id" : "5a1cb3ef8b9b2103f6cce1a9",
    		"question_id": "5a1cb4b38b9b2103f6cce1aa",
    		"answer_id": "5a1cb7ce8b9b2103f6cce1af",
    		"comment" : "This is a really good answer."
		})
		.end(function(err,res){
			expect(res.status).to.be.equal(200);
			done();
		});
	});

	it('Create a Topic', function(done){
		chai.request('http://localhost:3000/topic/create')
		.post('/')
		.send({
  			"topic" : "History"
		})
		.end(function(err,res){
			expect(res.status).to.be.equal(200);
			done();
		});
	});

	//GET A TOPIC


	it('Get all Topics', function(done){
		chai.request('http://localhost:3000/topic/all')
		.get('/')
		.end(function(err,res){
			expect(res.status).to.be.equal(200);
			done();
		});
	});

	it('Search a Question', function(done){
		chai.request('http://localhost:3000/search/question')
		.get('/')
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