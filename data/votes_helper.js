// var mongoose = require('mongoose');
// var vote = require('../model/vote');
// var question = require('../model/question');
// var answer = require('../model/question');
// var Promises = require('promise');


// var getVoteTypeObj = function (data) {
// 	var promise = new Promise((resolve, reject) => {
// 		var type_id = data.type_id;
// 		var type = data.type;
// 		//console.log(data._id + " " + type_id);
// 		if (type == 0) {
// 			resolve(question.findById(type_id));
// 		} else if (type == 1) {
// 			resolve(answer.findById(type_id));
// 		} else {
// 			//console.log("not yet supported");
// 			// reject("not yet supported");
// 			resolve(false);
// 		}
// 	});
// 	return promise;
// };

// var updateVoteCount = function (data) {
// 	var promise = new Promise((reject, resolve) => {
// 		//console.log("a " + data);
// 		//console.log("aa " + data._id);
// 		//console.log("about to update vote obj");
// 		data.votes = data.votes+1;
// 		resolve(data.save());
// 	});
// 	return promise;
// };

// module.exports = {

// 	upvote_solve : function(type, user_id, type_id, callback) {
// 		var promise = new Promise((resolve, reject) => {
// 			//console.log("data absent");
// 			let v = new vote();
// 			//console.log("c " + type + " c " + user_id + " v " + type_id);
// 			v.type_id = type_id;
// 			v.type = type;
// 			v.user_id = user_id;
// 			resolve(v.save());
// 		})
// 		.then(getVoteTypeObj)
// 		.then(updateVoteCount);
// 		// .catch(function (err) {
// 		// 	console.log("ce " + err);
// 		// 	callback(err, true);
// 		// });

// 	}

// }