var mongoose = require('mongoose');
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
			for (var i = 0; i < fs.length; i++) {
				if (fs[i]._id === u._id) {
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
			resolve(topic.findById(tid));
		}).then((t) => {
			var fs = t.followers;
			var f = false;
			for (var i = 0; i < fs.length; i++) {
				if (fs[i]._id === u._id) {
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
				var ts = u.topics;
				var f1 = false;
				for (var i =0; i< ts.length; i++) {
					if (ts[i]._id === t2._id) {
						console.log("found user match2");
						f1 = true;
					}
				}

				var promise = new Promise((resolve, reject) => {
					if (!f1) {
						console.log("updating user");
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
						console.log("creating activity.");
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
			resolve(user.findById(user_id));
		}).then((uf) => {
			var fs = uf.followers;
			var f = false;
			for (var i = 0; i < fs.length; i++) {
				if (fs[i]._id === u._id) {
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
				
				var ts = u.following;
				var f1 = false;
				for (var i =0; i< ts.length; i++) {
					if (ts[i]._id === uf1._id) {
						console.log("found user match2");
						f1 = true;
					}
				}

				var promise = new Promise((resolve, reject) => {
					if (!f1) {
						console.log("updating user2");
						u.following.push(uf1);
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
			resolve(question.findById(qid));
		}).then((q) => {
			var fs = q.followers;
			var arr = [];
			var f = false;
			for (var i = 0; i < fs.length; i++) {
				if (fs[i]._id === u._id) {
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
			resolve(topic.findById(tid));
		}).then((t) => {
			var ts = t.followers;
			var arr = [];
			var f = false;
			for (var i = 0; i < ts.length; i++) {
				if (ts[i]._id === u._id) {
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
				var ts1 = u.topics;
				var brr = [];
				var f1 = false;
				for (var i = 0; i < ts1.length; i++) {
					if (ts1[i]._id === u._id) {
						console.log("user match found2");
						f1 = true;
					} else {
						brr.push(ts1[i]);
					}
				}
				var promise = new Promise((resolve, reject) => {
					if (f1) {
						console.log("updating user");
						u.topics(brr);
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
			resolve(user.findById(user_id));
		}).then((u1) => {
			var us = u1.followers;
			var arr = [];
			var f = false;
			for (var i = 0; i < us.length; i++) {
				if (us[i]._id === u._id) {
					console.log("user match found.");
					f = true;
				} else {
					arr.push(us[i]);
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
				var us1 = u.following;
				var brr = [];
				var f1 = false;
				for (var i = 0; i < us1.length; i++) {
					if (us1[i]._id === u2._id) {
						console.log("user match found2");
						f1 = true;
					} else {
						brr.push(ts1[i]);
					}
				}
				var promise = new Promise((resolve, reject) => {
					if (f1) {
						console.log("updating user2");
						u.following(brr);
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