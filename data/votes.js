var mongoose = require('mongoose');
var vote = require('../model/vote');
// mongoose.Promise = require('bluebird');
// var client = require('../config/es_connection.js');
var question = require('../model/question');
var answer = require('../model/question');
// var comment = require('../model/comment');

var voteHelper = require('./votes_helper');
var Promises = require('promise');

var getEntry = function(type, user_id, type_id) {
	var promise = new Promise(function(resolve, reject){
		resolve(vote.findOne({type: type, user_id : user_id, type_id : type_id}));
	});
	return promise;
};



module.exports = {

	upvote : function(type, user_id, type_id, callback) {
		
		var body = {
			success: false,
			msg : "data present"
		}

		var insertVote = function (data) {
			var promise = new Promise((resolve, reject) => {
				console.log(data);
				if (data._id) {
					console.log("data present " + data._id);
					reject(body);
				} else {
					resolve(voteHelper.upvote_solve(type, user_id, type_id, callback));
				}
			});
			return promise;
		};



		getEntry(type, user_id, type_id)
			.then(insertVote)
			.then(function(d){
				console.log("in oout");
				callback(false, "upvoted");
			}, function (err) { callback(err, body)})
			.catch(function (err) {
				console.log("inside catch clause " + err);
				callback(err, "already upvoted");
			});
	}
	// ,
	// downvote : function(type, user_id, type_id, callback) {
		
	// 	var body = {
	// 		success: false,
	// 		msg : "data present"
	// 	}

	// 	var removeVote = function (data) {
	// 		var promise = new Promise((resolve, reject) => {
	// 			console.log(data);
	// 			if (data._id) {
	// 				console.log("data present " + data._id);
	// 				reject(body);
	// 			} else {
	// 				resolve(voteHelper.upvote_solve(type, user_id, type_id, callback));
	// 			}
	// 		});
	// 		return promise;
	// 	};



	// 	getEntry(type, user_id, type_id)
	// 		.then(insertVote)
	// 		.then((d) => {
	// 			console.log("in oout");
	// 			callback(false, "upvoted");
	// 		}, (err) => callback(err, body))
	// 		.catch(function (err) {
	// 			console.log("inside catch clause " + err);
	// 			callback(err, "already upvoted");
	// 		});
	// }


}