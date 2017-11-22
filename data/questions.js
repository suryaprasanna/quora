var mongoose = require('mongoose');
var question = require('../model/question');
// mongoose.Promise = require('bluebird');
// var client = require('../config/es_connection.js');
var es_client = require('../config/es_handler.js');
var Promises = require('promise');

var questionUserUtil = require('../data/question_users');
var questionUser = require('../model/question_user');
var questionAnswer = require('../model/question_answer');

var index = "quora";
var type = "questions";

module.exports = {

	getQuestions : function() {
		var promise = new Promise(function(resolve, reject){
			resolve(questionAnswer.find({}));
		});
		return promise;
	},

	askQuestion : function(q, name, callback){

		var createQuestionUserEntry = function(data) {
			var promise = new Promise(function(resolve, reject){
				//console.log("d1 " + data);
				// var q1 = data.q;
				// console.log("es " + data.esObj._id);
				//console.log("q " + q._id);
				//console.log("eq " + q.e_id);
				// console.log("q " + q._id);

				var qu = new questionUser();
				qu.user_id = q.user_id;
				qu.q_id = q._id;
				qu.question = q.question;
				resolve(qu.save());
			});
			return promise;
		};
		
		var createQuestion = function(data) {
			var promise = new Promise(function(resolve, reject){
				q.e_id = data._id;
				resolve(q.save());
			});
			return promise;
		};

		es_client.createDocument(index, type, name)
			// .then(function (esObj) {
			// 	return new Promise((resolve, reject) => {
			// 		resolve({esObj: esObj, q : q});
			// 	});
			// })
			.then(createQuestion)
			.then(createQuestionUserEntry)
			.then(function(data) {
				var body = {
					id : q._id,
					question : name,
					user_id : q.user_id,
					created_on : q.created_on,
					updated_on : q.updated_on
				}
				callback(false, body);
			})
			.catch(function(err) {
				//console.log(err);
				callback(err, true);
			});

		// client.index({
		// 	index: index,
		// 	type: "questions",
		// 	body: {
		// 		name : name
		// 	}
		// }).then(function (resp) {
		// 	console.log("data " + resp._id);
		// 	q.e_id = resp._id;
		// 	return q.save();
		// }).then(function (q1) {
		// 	let qu = new questionUser();
		// 	qu.user_id = q1.user_id;
		// 	qu.q_id = q1._id;
		// 	return qu.save();
		// }).then(function (res) {
		// 	console.log("success " + res);
		// 	callback(false, res);
		// }, function (err) {
		// 	console.log(err);
		// 	callback(err, true)
		// });
	},

	editQuestion : function(eid, name) {
		return es_client.updateDocument(index, eid, type, name);
	},

	getQuestion : function(id){

		// question.findById(id, callback);
		var promise = new Promise(function(resolve, reject){
			resolve(question.findById(id));
		});
		return promise;

	 //    const query = ({},{question: 1 });
	 //    question.find({},{question: 1 }, callback);
	}
}
