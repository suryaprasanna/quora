var mongoose = require('mongoose');
var answer = require('../model/answer');
var Promises = require('promise');
var question = require('../model/question');


module.exports = {

	putAnswer : function(ans, q){
		var promise = new Promise((resolve, reject) => {
			ans._creator = q._id;
			resolve(ans.save());
		}).then((data) => {
			var promise = new Promise((resolve, reject) => {
				console.log(q);
				q.answers.push(data);
				console.log(q);
				resolve(q.save());
			})
			.catch((err) => {
				console.log(err);
			});
			return promise;
		});
		return promise;
	},

	editAnswer : function(ans, name) {
		var promise = new Promise((resolve, reject) => {
			ans.answer = name;
			resolve(ans.save());
		});
		return promise;
	},

	getAnswer : function(id){		
		var promise = new Promise(function (resolve, reject) {
			resolve(answer.findById(id));
		});
		return promise;
	}
}
