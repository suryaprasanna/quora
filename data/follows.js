var mongoose = require('mongoose');
var follow = require('../model/follow');
var Promises = require('promise');
var question = require('../model/question');
var topic = require('../model/topic');
var user = require('../model/user');
var activity = require('../model/activity');

module.exports = {

	followQuestion : function(qid, u) {
		var promise = new Promise((resolve, reject) => {
			resolve(question.findById(qid));
		}).then((q) => {
			var fs = q.followers;
			var f = false;
			for (int i = 0; i < fs.length; i++) {
				if (fs[i]._id === u._id) {
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
			}).then((q1) => {
				var promise = new Promise((resolve, reject) => {
					if (!f) {
						var a = new activity();
						a.doc = "questions";
						a.doc_id = q1._id;
						a.type = "Started following the question.";
						a.user_id = u._id;
						resolve(a.save());
					} else {
						resolve(q1);
					}
				})
			}).then((data) => {
				var promise = new Promise((resolve, reject) => {
					resolve(u);
				});
				return promise;
			});
			return promise;
		});
		return promise;
	},

	followTopic : function(tid, u) {
		var res = u;
		var t_final = new topic();
		var promise = new Promise((resolve, reject) => {
			resolve(topic.findById(tid));
		}).then((t) => {
			var fs = t.followers;
			var f = false;
			for (int i = 0; i < fs.length; i++) {
				if (fs[i]._id === u._id) {
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
			}).then((t2) => {
				t_final = t2;
				var ts = u.topics;
				var f1 = false;
				for (int i =0; i< ts.length; i++) {
					if (ts[i]._id === t2._id) {
						f1 = true;
					}
				}

				var promise = new Promise((resolve, reject) => {
					if (!f1) {
						ts.push(t2);
						u.topics = ts;
						resolve(u.save());
					} else {
						resolve(u);
					}
				});
				return promise;
			}).then((u) => {
				var promise = new Promise((resolve, reject) => {
					if (!f) {
						var a = new activity();
						a.doc = "topics";
						a.doc_id = t_final._id;
						a.type = "Started following the topic.";
						a.user_id = u._id;
						resolve(a.save());
					} else {
						resolve(t1);
					}
				})
			}).then((data) => {
				var promise = new Promise((resolve, reject) => {
					resolve(u);
				});
				return promise;
			});
		});
		return promise;
	},

	followUser : function(user_id, u) {
		var promise = new Promise((resolve, reject) => {
			resolve(user.findById(user_id));
		}).then((uf) => {
			var fs = uf.followers;
			var f = false;
			for (int i = 0; i < fs.length; i++) {
				if (fs[i]._id === u._id) {
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
						u.following.push(uf1);
						resolve(u.save());
					} else {
						resolve(u);
					}
				});
				return promise;
			}).then((u1) => {
				var a = new activity();
				a.doc = "users";
				a.doc_id = u1._id;
 				a.user_id = u1._id;
 				a.type = "Started following the user.";
 				var promise = new Promise((resolve, reject) => {
 					resolve(a.save());
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