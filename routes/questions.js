var questionUtil = require('../data/questions');
var question = require('../model/question');
var Promises = require('promise');
var voteUtil = require('../data/votes');
var user = require('../model/user');

module.exports = {
    getQuestions : function(req, res){

        questionUtil.getQuestions()
            .then((data) => {
                console.log("qq: " + data);
                res.json({success: true, body: data, msg: "Successfully retrieved all questions."});
            }).catch((err) => {
                console.log(err);
                res.json({success: false, msg: "Error in retieving questions data."});
            });
    },

    getQuestion : function(req, res) {
        var question_id = req.query.question_id;
        questionUtil.getQuestion(question_id)
            .then((data) => {
                console.log("qq: " + data);
                res.json({success: true, body: data, msg: "Successfully retrieved question."});
            }).catch((err) => {
                console.log(err);
                res.json({success: false, msg: "Error in retieving question data."});
            });
    },

    askQuestion : function(req, res) {
        //console.log("aq " + req);        

        let q1 = new question();
        console.log("req_body: "+ req.body);
        q1.user = req.body.user_id;
        q1.is_anonymous = req.body.is_anonymous;
        q1.votes = 0;
        q1.question = req.body.name;
        q1.topics = req.body.topics;
        q1.followers = [];
        q1.followers.push(req.body.user_id);
        q1.created_on = new Date();
        q1.updated_on = new Date();
        // console.log(q1);
        questionUtil.askQuestion(q1, req.body.name, function(err, resp){
            if (err) {
                //console.log("Not able to get questions from db.");
                res.json({success: false, msg: 'Failed to save question to db'});
            } else {
                //console.log("hi resp " + resp);
                res.json({success: true, body: resp, msg: 'Successfully saved question to db'});
            }
        });
    },

    editQuestion : function(req, resp) {
        var id = req.body.question_id;
        var name = req.body.name;
        var user_id = req.body.user_id;
        questionUtil.getQuestion(id)
            .then((q) => {
                if (q.user._id === user_id) {
                    questionUtil.editQuestion(q, name)
                        .then((data) => {
                            resp.json({success: true, msg: "updated succesfully"});
                        })
                        .catch(function (err) {
                            resp.json({success: false, msg: "failed to update to database."});
                        });
                } else {
                    resp.json({success: false, msg: "not the owner of the question"});
                }
            })
            .catch(function (err) {
                resp.json({success: false, msg: "error in fetching user details"});
            });
    },

    upvote : function(req, resp) {
        let type = 0;
        let user_id = req.body.user_id;
        let type_id = req.body.type_id;
        voteUtil.upvote(type, user_id, type_id, function (err, body) {
            if (err) {
                resp.json({success: false, msg: "error in getting upvotes."});
            } else {
                resp.json({success: true, msg: "Succesfully upvoted."});
            }
        });
    },

    downvote : function(req, resp) {

    }
}
