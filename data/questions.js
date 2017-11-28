var mongoose = require('mongoose');
var question = require('../model/question');
var user = require('../model/user');

var es_client = require('../config/es_handler.js');
var Promises = require('promise');

var activity = require('../model/activity');

var index = "quora";
var type = "questions";

module.exports = {

	getQuestions : function() {
		var promise = new Promise(function(resolve, reject){
			resolve(question.find()
				.populate({path: 'user'})
				.populate({path: 'answers'})
				.populate({path: 'comments'})
				.populate({path: 'topics'})
				.populate({path: 'followers'})
			);
		});
		return promise;
	},

	askQuestion : function(q, name, callback){

		var promise = new Promise((resolve, reject) => {
			resolve(es_client.createDocument(index, type, name));
		}).then((data) => {
			var promise = new Promise((resolve, reject) => {
				q.e_id = data.e_id;
				resolve(q.save());
			});
			return promise;
		}).then((ques) => {
			var promise = new Promise((resolve, reject) => {
				// console.log(ques);
				var a1 = new activity();
				a1.doc = "questions";
				a1.type = "ask";
				a1.doc_id = q._id;
				a1.user_id = q.user_id;
				resolve(a1.save());
			});
			return promise;
		}).then((data) => {
			var promise = new Promise((resolve, reject) => {
				resolve(this.getQuestion(q._id));
			});
			return promise;
		}).then((res) => {

			callback(false, q);

			// // create feed entry for all followers of the topics for the question.


			// var promise = new Promise((resolve, reject) => {
			// 	resolve(q);
			// });
			// return promise;
		}).catch((err) => {
			console.log(err);
			callback(err, false);
		});
		return promise;


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
		}).then((data) => {

			// create feed entry for all followers of the question.
			

			var promise = new Promise((resolve, reject) => {
				resolve(q);
			});
			return promise;
		});
		return promise;
	},

	getQuestion : function(id){
		var promise = new Promise(function(resolve, reject){
			resolve(question.findById(id)
				.populate({path: 'user'})
				.populate({path: 'answers'})
				.populate({path: 'comments'})
				.populate({path: 'topics'})
				.populate({path: 'followers'})
				// .populate({path: 'answers.user'})
				);
		});
		return promise;
	}
}
