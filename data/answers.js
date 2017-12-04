var mongoose = require('mongoose');
var answer = require('../model/answer');
var Promises = require('promise');
var question = require('../model/question');
var userUtil = require('../data/users');

module.exports = {

	putAnswer : function(ans, q){
		var promise = new Promise((resolve, reject) => {
			resolve(ans.save());
		}).then((data) => {
			var promise = new Promise((resolve, reject) => {
				var arr = q.answers;
				arr.push(data);
				q.is_answered = true;
				q.answers = arr;
				resolve(q.save());
			})
			.catch((err) => {
				console.log(err);
			});
			return promise;
		});

		// add activity and feed entries




		return promise;
	},

	editAnswer : function(ans, name) {
		var promise = new Promise((resolve, reject) => {
			ans.answer = name;
			ans.updated_on = new Date();
			resolve(ans.save());
		});


		// add activity and feed entries
		


		

		return promise;
	},

	getAnswer : function(id){		
		var promise = new Promise(function (resolve, reject) {
			resolve(answer.findById(id)
				.populate({path : 'user'})
				.populate({path : 'comments'})
			);
		});
		return promise;
	}
}