var mongoose = require('mongoose');
var question = require('../model/question');

var es_client = require('../config/es_handler.js');
var Promises = require('promise');

var activity = require('../model/activity');

var index = "quora";
var type = "questions";

module.exports = {

	getQuestions : function() {
		var promise = new Promise(function(resolve, reject){
			resolve(question.find({}));
		});
		return promise;
	},

	askQuestion : function(q, name, callback){

		var createQuestion = function(data) {
			var promise = new Promise(function(resolve, reject){
				q.e_id = data._id;
				resolve(q.save());
			});
			return promise;
		};

		var createActivity = function(data) {
			var promise = new Promise((resolve, reject) => {
				var a1 = new activity();
				a1.doc = "questions";
				a1.type = "ask";
				a1.doc_id = data._id;
				a1.user_id = data.user_id;
				resolve(a1.save());
			});
			return promise;
		};

		es_client.createDocument(index, type, name)
			.then(createQuestion)
			.then(createActivity)
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
				console.log(err);
				callback(err, true);
			});
	},

	editQuestion : function(q, name) {
		var eid = q.e_id;
		var promise = new Promise((resolve, reject) => {
			resolve(es_client.updateDocument(index, eid, type, name));
		}).then((data) => {
			var promise = new Promise((resolve, reject) => {
				q.question = name;
				q.updated_on = new Date();
				resolve(q.save());
			});
			return promise;
		}).then((data) => {
			var promise = new Promise((resolve, reject) => {
				var a1 = new activity();
				a1.doc = "questions";
				a1.type = "edit";
				a1.doc_id = data._id;
				a1.user_id = data.user_id;
				resolve(a1.save());
			});
			return promise;
		});
		return promise;
	},

	getQuestion : function(id){
		var promise = new Promise(function(resolve, reject){
			console.log("id:" + id);
			resolve(question.findById(id)
				.populate({path: 'answers', model: 'answer'}));
			console.log("qid: " + question);
		});
		return promise;
	}
}
