var mongoose = require('mongoose');
var follow = require('../model/follow');
var Promises = require('promise');
var question = require('../model/question');
var topic = require('../model/topic');
var user = require('../model/user');

module.exports = {

	followQuestion : function(qid, u) {

		var promise = new Promise((resolve, reject) => {
			resolve(question.findById(qid));
		}).then((q) => {
			var fs = q.followers;
			var f = false;
			for (int i = 0; i < fs.length; i++) {
				if (fs[i] === u) {
					f = true;
				}
			}

			var promise = new Promise((resolve, reject) => {
				if (!f) {
					fs.push(u);
					q.followers = fs;
					resolve(q.save());
				} else {
					resolve(q);
				}
			});
			return promise;
		});
		return promise;
	},

	followTopic : function(tid, u) {
		var promise = new Promise((resolve, reject) => {
			resolve(topic.findById(tid));
		}).then((t) => {
			var fs = t.followers;
			var f = false;
			for (int i = 0; i < fs.length; i++) {
				if (fs[i] === u) {
					f = true;
				}
			}

			var promise = new Promise((resolve, reject) => {
				if (!f) {
					fs.push(u);
					t.followers = fs;
					resolve(t.save());
				} else {
					resolve(t);
				}
			});
			return promise;
		});
		return proimise;
	},

	followUser : function(user_id, u) {
		var promise = new Promise((resolve, reject) => {
			resolve(user.findById(user_id));
		}).then((uf) => {
			var fs = uf.followers;
			var f = false;
			for (int i = 0; i < fs.length; i++) {
				if (fs[i] === u) {
					f = true;
				}
			}

			var promise = new Promise((resolve, reject) => {
				if (!f) {
					fs.push(u);
					uf.followers = fs;
					resolve(uf.save());
				} else {
					resolve(uf);
				}
			}).then((uf1) => {
				var promise = new Promise((resolve, reject) => {
					if (!f) {
						u.followers.push(uf1);
						resolve(u.save());
					} else {
						resolve(u);
					}
				});
				return promise;
			});
			return promise;
		});
		return promise;
	},
	unfollowQuestion : function(qid, u) {
		var promise = new Promise((resolve, reject) => {
			resolve(question.findById(qid));
		}).then((q) => {
			var fs = q.followers;
			var arr = [];
			var f = false;
			for (int i = 0; i < fs.length; i++) {
				if (fs[i] === u) {
					f = true;
				} else {
					arr.push(fs[i]);
				}
			}

			var promise = new Promise((resolve, reject) => {
				if (f) {
					q.followers = fs;
					resolve(q.save());
				} else {
					resolve(q);
				}
			});
			return promise;
		});
		return promise;
	},

	unfollowTopic : function(tid, u) {
		
	},

	unfollowUser : function(user_id, u) {
		
	}

}