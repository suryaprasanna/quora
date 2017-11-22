var mongoose = require('mongoose');
var answer = require('../model/answer');
// mongoose.Promise = require('bluebird');
// var client = require('../config/es_connection.js');
var es_client = require('../config/es_handler.js');
var Promises = require('promise');

var answerUser = require('../model/answer_user');
var questionAnswer = require('../model/question_answer');

var question = require('../model/question');

var index = "quora";
var type = "answers";

module.exports = {

	putAnswer : function(ans, q, name, callback){
		var createAnswerUserEntry = function(data) {
			var promise = new Promise(function (resolve, reject) {
				// console.log("d1 " + data);
				// var q1 = data.q;
				// console.log("es " + data.esObj._id);
				//console.log("ans " + ans._id);
				//console.log("eans " + ans.e_id);

				var au = new answerUser();
				au.user_id = ans.user_id;
				au.a_id = ans._id;
				au.answer = ans.answer;
				resolve(au.save());
			});
			return promise;
		};
		
		var createAnswer = function(data) {
			var promise = new Promise(function (resolve, reject) {
				//console.log("ans : " + ans.user_id);
				ans.e_id = data._id;
				resolve(ans.save());
			});
			return promise;
		};

		var createQuestionAnswerEntry = function(data) {
			var promise = new Promise(function (resolve, reject){
				var qa = new questionAnswer();
				qa.q_id = q._id;
				qa.a_id = ans._id;
				qa.answer = ans.answer;
				qa.question = q.question;
				
				resolve(qa.save());
			});
			return promise;
		};

		es_client.createDocument(index, type, name)
			// .then(function (esObj) {
			// 	return new Promise((resolve, reject) => {
			// 		resolve({esObj: esObj, q : q});
			// 	});
			// })
			.then(createAnswer)
			.then(createAnswerUserEntry)
			.then(createQuestionAnswerEntry)
			.then(data => {
				var body = {
					id : ans._id,
					answer : name,
					user_id : ans.user_id,
					created_on : ans.created_on,
					updated_on : ans.updated_on
				}
				callback(false, body);
			})
			.catch(function(err) {
				//console.log(err);
				callback(err, true);
			});



		// client.index({
		// 	index: index,
		// 	type: "answers",
		// 	body: {
		// 		name : name
		// 	}
		// }).then(function (resp) {
		// 	console.log("data " + resp._id);
		// 	ans.e_id = resp._id;

		// 	var promise = new Promises(function (resolve, reject) {
		// 		resolve(ans);
		// 	});
			
		// 	promise.then(function(a1) {
		// 		return a1.save();
		// 	})
		// 	.then(function(a2) {
		// 		console.log("success");
		// 		callback(false, a2);
		// 	})
		// 	.catch(function (err) {
		// 		console.log("failed " + err);
		// 		callback(err, true);
		// 	});
		// }, function (err) {
		// 	console.log(err);
		// 	callback(err, true)
		// });
	},

	editAnswer : function(eid, name) {
		return es_client.updateDocument(index, eid, type, name);
	},

	getAnswer : function(id){
		
		var promise = new Promise(function (resolve, reject) {
			resolve(answer.findById(id));
		});
		return promise;
	}
}
