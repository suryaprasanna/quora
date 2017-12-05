var mongoose = require('mongoose');
var answer = require('../model/answer');

var es_client = require('../config/es_handler.js');
var Promises = require('promise');


var question = require('../model/question');

var answerUtil = require('../data/answers');
var questionUtil = require('../data/questions');




module.exports = {

	commentOnQues : function(comment, q_id){
		
		var promise = new Promise((resolve, reject) => {
			resolve(questionUtil.getQuestion(q_id));
		}).then((data) => {
			var promise = new Promise((resolve, reject) => {
				data.comments.push(comment);
				resolve(data.save());
			});
			return promise;
		});
		return promise;
	},

	commentOnAns : function(comment, a_id) {
		// console.log("comment is: "+comment.comment);
		// console.log("ans id is: "+a_id)
		var promise = new Promise((resolve, reject) => {
			resolve(answerUtil.getAnswer(a_id));
		}).then((data) => {
			var promise = new Promise((resolve, reject) => {
				// console.log("answer obj is: "+data);
				data.comments.push(comment);
				resolve(data.save());
			});
			return promise;
		});
		return promise;
	},

	commentOnComment : function(id){
		
	}
}
