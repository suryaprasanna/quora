var followUtil = require('../data/follows');
var user = require('../model/user');
var Promises = require('promise');

module.exports = {

    followQuestion : function(req, res) {
        var qid = req.body.question_id;
        var user_id = req.body.user_id;
        user.findById(user_id)
            .then((user) => {
                followUtil.followQuestion(qid, user)
                    .then((data) => {
                        res.json({success: true, body: user, msg: "Successfully followed the question."});
                    }).catch((err) => {
                        res.json({success: false, msg: "Error in following the question"});
                    });
            }).catch((err) => {
                res.json({success: false, msg: "Error in getting user details."});
            });
    },

    followTopic : function(req, res) {
        var tid = req.body.topic_id;
        var user_id = req.body.user_id;
        user.findById(user_id)
            .then((user) => {
                followUtil.followTopic(tid, user)
                    .then((data) => {
                        res.json({success: true, body: user, msg: "Successfully followed the topic."});
                    }).catch((err) => {
                        res.json({success: false, msg: "Error in following the topic."});
                    });
            }).catch((err) => {
                res.json({success: false, msg: "Error in getting user details."});
            });
    },

    followUser : function(req, res) {
        var fuid = req.body.follow_user_id;
        var user_id = req.body.user_id;
        user.findById(user_id)
            .then((user) => {
                followUtil.followUser(fuid, user)
                    .then((data) => {
                        res.json({success: true, body: user, msg: "Successfully followed the topic."});
                    }).catch((err) => {
                        res.json({success: false, msg: "Error in following the topic."});
                    });
            }).catch((err) => {
                res.json({success: false, msg: "Error in getting user details."});
            });
    }


}
