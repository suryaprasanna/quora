var mongoose = require('mongoose');
var topic = require('../model/topic');
var Promises = require('promise');


module.exports = {
	getTopics : function () {
		var promise = new Promise((resolve, reject) => {
			resolve(topic.find());
		});
		return promise;
	},

	createTopic : function(tp) {
		var promise = new Promise((resolve, reject) => {
			var t = new topic();
			t.topic = tp;
			resolve(t.save());
		});
		return promise;
	},

	getTopic : function(id) {
		var promise = new Promise((resolve, reject) => {
			resolve(topic.findById(id));
		});
		return promise;
	}

}