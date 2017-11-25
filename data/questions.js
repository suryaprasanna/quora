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
			resolve(question.find());
		});
		return promise;
	},

	askQuestion : function(q, name, callback){

		var promise = new Promise((resolve, reject) => {
			resolve(es_client.createDocument(index, type, name));
		}).then((data) => {
			var promise = new Promise((resolve, reject) => {
				q.e_id = data.e_id;
				resolve(q);
			});
			return promise;
		}).then((q) => {
			var promise = new Promise((resolve, reject) => {
				// console.log("uu: " + q.user_id);
				resolve(user.findById(q.user_id));
			});
			return promise;
		}).then((user) => {
			var promise = new Promise((resolve, reject) => {
				// console.log("s: " + user);
				q.followers.push(user);
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

			callback(false, q);

			// // create feed entry for all followers of the topics for the question.


			// var promise = new Promise((resolve, reject) => {
			// 	resolve(q);
			// });
			// return promise;
		}).catch((err) => {
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
			// console.log("id:" + id);
			resolve(question.findById(id)
				.populate({path: 'answers', model: 'answer'}//, {path: 'topics', model: 'topic'}
				)
				);
			// console.log("q: " + question);
		});
		return promise;
	}
}