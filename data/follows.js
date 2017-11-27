var mongoose = require('mongoose');
var Promises = require('promise');
var question = require('../model/question');
var topic = require('../model/topic');
var user = require('../model/user');
var activity = require('../model/activity');

var userUtil = require('../data/users');
var questionUtil = require('../data/questions');
var topicUtil = require('../data/topics');

module.exports = {

	followQuestion : function(qid, u) {
		var promise = new Promise((resolve, reject) => {
			resolve(questionUtil.getQuestion(qid));
		}).then((q) => {
			var fs = q.followers;
			var f = false;
			var v2 = u._id.toString();
			
			for (var i = 0; i < fs.length; i++) {
				var v1 = fs[i]._id.toString();
				if (v1 === v2) {
					console.log("found user match");
					f = true;
				}
			}

			var promise = new Promise((resolve, reject) => {
				if (!f) {
					console.log("updating q");
					fs.push(u);
					q.followers = fs;
					resolve(q.save());
				} else {
					resolve(q);
				}
			}).then((q1) => {
				var promise = new Promise((resolve, reject) => {
					if (!f) {
						console.log("creating activity");
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
			resolve(topicUtil.getTopic(tid));
		}).then((t) => {
			var fs = t.followers;
			var f = false;
			var v1 = u._id.toString();

			for (var i = 0; i < fs.length; i++) {
				var v2 = fs[i]._id.toString();
				if (v1 === v2) {
					console.log("found user match");
					f = true;
				}
			}

			var promise = new Promise((resolve, reject) => {
				if (!f) {
					console.log("updating topic");
					fs.push(u);
					t.followers = fs;
					resolve(t.save());
				} else {
					resolve(t);
				}
			}).then((t2) => {
				t_final = t2;

				var promise = new Promise((resolve, reject) => {
					if (!f) {
						console.log("updating user");
						var ts = u.topics;
						ts.push(t2);
						u.topics = ts;
						resolve(u.save());
					} else {
						resolve(u);
					}
				});
				return promise;
			}).then((u) => {
				res = u;
				var promise = new Promise((resolve, reject) => {
					if (!f) {
						console.log("creating activity.");
						var a = new activity();
						a.doc = "topics";
						a.doc_id = t_final._id;
						a.type = "Started following the topic.";
						a.user_id = u._id;
						resolve(a.save());
					} else {
						resolve(u);
					}
				})
			}).then((data) => {
				var promise = new Promise((resolve, reject) => {
					resolve(res);
				});
				return promise;
			});
		});
		return promise;
	},

	followUser : function(user_id, u) {
		var res = u;
		var promise = new Promise((resolve, reject) => {
			resolve(userUtil.getUser(user_id));
		}).then((uf) => {
			var fs = uf.followers;
			var f = false;
			var v1 = u._id.toString();
			for (var i = 0; i < fs.length; i++) {
				var v2 = fs[i]._id.toString();
				if (v1 === v2) {
					console.log("found user match");
					f = true;
				}
			}

			var promise = new Promise((resolve, reject) => {
				if (!f) {
					console.log("updating user");
					fs.push(u);
					uf.followers = fs;
					resolve(uf.save());
				} else {
					resolve(uf);
				}
			}).then((uf1) => {
				
				var promise = new Promise((resolve, reject) => {
					if (!f) {
						console.log("updating user2");
						u.following = uf1;
						resolve(u.save());
					} else {
						resolve(u);
					}
				});
				return promise;
			}).then((u1) => {
				res = u1;
 				var promise = new Promise((resolve, reject) => {
 					if (!f) {
 						console.log("creating activity.");
						var a = new activity();
						a.doc = "users";
						a.doc_id = u1._id;
		 				a.user_id = u1._id;
		 				a.type = "Started following the user.";
	 					resolve(a.save());
	 				} else {
	 					resolve(res);
	 				}
 				});
 				return promise;
			}).then((data) => {
				var promise = new Promise((resolve, reject) => {
					resolve(res);
				});
				return promise;
			});
			return promise;
		});
		return promise;
	},

	unfollowQuestion : function(qid, u) {
		var promise = new Promise((resolve, reject) => {
			resolve(questionUtil.getQuestion(qid));
		}).then((q) => {
			var fs = q.followers;
			var arr = [];
			var f = false;
			var v2 = u._id.toString();
			for (var i = 0; i < fs.length; i++) {
				var v1 = fs[i]._id.toString();
				if (v1 === v2) {
					console.log("user match found.");
					f = true;
				} else {
					arr.push(fs[i]);
				}
			}

			var promise = new Promise((resolve, reject) => {
				if (f) {
					console.log("updating question.");
					q.followers = arr;
					resolve(q.save());
				} else {
					resolve(q);
				}
			}).then((q1) => {
				var promise = new Promise((resolve, reject) => {
					if (f) {
						console.log("creating activity");
						var a = new activity();
						a.doc = "questions";
						a.doc_id = q1._id;
						a.type = "unfollowed the question.";
						resolve(a.save());
					} else {
						resolve(q1);
					}
				});
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

	unfollowTopic : function(tid, u) {
		var res = u;
		var res_t = new topic();
		var promise = new Promise((resolve, reject) => {
			resolve(topicUtil.getTopic(tid));
		}).then((t) => {
			var ts = t.followers;
			var arr = [];
			var f = false;
			var v1 = u._id.toString();
			for (var i = 0; i < ts.length; i++) {
				var v2 = ts[i]._id.toString();
				if (v1 === v2) {
					console.log("user match found");
					f = true;
				} else {
					arr.push(ts[i]);
				}
			}

			var promise = new Promise((resolve, reject) => {
				if (f) {
					console.log("updating topic.");
					t.followers = arr;
					resolve(t.save());
				} else {
					resolve(t);
				}
			}).then((t1) => {
				res_t = t1;

				var promise = new Promise((resolve, reject) => {
					if (f) {
						var vt = t1._id.toString();
						console.log("inside f user " + vt);
						var ts1 = u.topics;
						var brr = [];
						for (var i = 0; i < ts1.length; i++) {
							var v3 = ts1[i]._id.toString();
							console.log(v3);
							if (vt === v3) {
								console.log("user match found " + vt);
							} else {
								brr.push(v3);
							}
						}

						console.log("updating user");
						u.topics = brr;
						resolve(u.save());
					} else {
						resolve(u);
					}
				});
				return promise;
			}).then((u2) => {
				res = u2;
				var promise = new Promise((resolve, reject) => {
					if (f) {
						console.log("creating activity.");
						var a = new activity();
						a.doc = "topics";
						a.doc_id = res_t._id;
						a.type = "unfollowed the topic.";
						resolve(a.save());
					} else {
						resolve(res);
					}
				});
			}).then((data) => {
				var promise = new Promise((resolve, reject) => {
					resolve(res);
				});
				return promise;
			});
			return promise;
		});
		return promise;
	},

	unfollowUser : function(user_id, u) {
		var res = u;
		var promise = new Promise((resolve, reject) => {
			resolve(userUtil.getUser(user_id));
		}).then((u1) => {
			var us = u1.followers;
			var arr = [];
			var f = false;
			var v1 = u._id.toString();
			for (var i = 0; i < us.length; i++) {
				var v2 = us[i]._id.toString();
				if (v1 === v2) {
					console.log("user match found.");
					f = true;
				} else {
					arr.push(v2);
				}
			}

			var promise = new Promise((resolve, reject) => {
				if (f) {
					console.log("updating user");
					u1.followers = arr;
					resolve(u1.save());
				} else {
					resolve(u1);
				}
			}).then((u2) => {
				var promise = new Promise((resolve, reject) => {
					if (f) {
						var ts1 = u.following;
						var brr = [];
						var vt = u2._id.toString();
						for (var i = 0; i < ts1.length; i++) {
							var v3 = ts1[i]._id.toString();
							if (vt === v3) {
								console.log("user match found");
							} else {
								brr.push(v3);
							}
						}
						console.log("updating user2");
						u.following = brr;
						resolve(u.save());
					} else {
						resolve(u);
					}
				});
				return promise;
			}).then((u3) => {
				res = u3;
				var promise = new Promise((resolve, reject) => {
					if (f) {
						console.log("creating activity.");
						var a = new activity();
						a.doc = "users";
						a.doc_id = u3._id;
						a.type = "unfollowed the user.";
						resolve(a.save());
					} else {
						resolve(u3);
					}
				});
			}).then((data) => {
				var promise = new Promise((resolve, reject) => {
					resolve(res);
				});
				return promise;
			});
			return promise;
		});
		return promise;
	}

}