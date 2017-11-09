// var mongoose = require('mongoose');
// var questionUser = require('../model/question_user');
// // mongoose.Promise = require('bluebird');
// var client = require('../config/es_connection.js');
// var Promises = require('promise');
// var index = "quora";

// module.exports = {
// 	saveEntry : function(qu, callback){

// 		var promise = new Promises(function (resolve, reject) {
// 			resolve(qu);
// 		});
		
// 		promise.then(function(qu1) {
// 			return qu1.save();
// 		})
// 		.then(function(qu2) {
// 			console.log("success");
// 			callback(false, qu2);
// 		})
// 		.catch(function (err) {
// 			console.log("failed " + err);
// 			callback(err, true);
// 		});
// 	},
// 	deleteEntry : function(qid, user, callback) {
// 		questionUser.find({q_id : qid, user_id : user}).remove().exec();
// 		// var promise = new Promises(function (resolve, reject) {
// 		// 	resolve(qu);
// 		// });
		
// 		// promise.then(function(q, u) {
// 		// 	return qu1.save();
// 		// })
// 		// .then(function(qu2) {
// 		// 	console.log("success");
// 		// 	callback(false, qu2);
// 		// })
// 		// .catch(function (err) {
// 		// 	console.log("failed " + err);
// 		// 	callback(err, true);
// 		// });
// 	}

// }