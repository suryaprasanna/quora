var questionUtil = require('../data/questions');
var question = require('../model/question');
var Promises = require('promise');
var voteUtil = require('../data/votes');
var user = require('../model/user');

module.exports = {
    getQuestions : function(req, res){

        questionUtil.getQuestions()
            .then((data) => {
                var obj = [];
                for (var i = 0; i < data.length; i++) {
                    var f = false;
                    a2 = [];
                    var q = data[i];
                    for (var j = 0; j < q.answers.length; j++) {
                        if (f) break;
                        var a = q.answers[j];
                        a2.push(a);
                        f = true;
                    }
                    q.answers = a2;
                    obj.push(q);
                }
                console.log("qq: " + obj);
                res.status(200);
                res.json({success: true, body: obj, msg: "Successfully retrieved all questions."});
            }).catch((err) => {
                console.log(err);
                res.status(500);
                res.json({success: false, msg: "Error in retieving questions data."});
            });
    },

    getUnansweredQuestions : function(req,res) {
        questionUtil.getUnansweredQuestions()
            .then((data) => {
                console.log("qq: " + data);
                res.status(200);
                res.json({success: true, body: data, msg: "Successfully retrieved unanswered questions."});
            }).catch((err) => {
                console.log(err);
                res.status(500);
                res.json({success: false, msg: "Error in retieving unanswered questions data."});
            });
    },

    getQuestion : function(req, res) {
        var question_id = req.query.question_id;
        questionUtil.getQuestion(question_id)
            .then((data) => {
                console.log("qq: " + data);
                res.status(200);
                res.json({success: true, body: data, msg: "Successfully retrieved question."});
            }).catch((err) => {
                console.log(err);
                res.status(500);
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
                res.status(500);
                res.json({success: false, msg: 'Failed to save question to db'});
            } else {
                //console.log("hi resp " + resp);
                res.status(200);
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
                            resp.status(200);
                            resp.json({success: true, msg: "updated succesfully"});
                        })
                        .catch(function (err) {
                            resp.status(500);
                            resp.json({success: false, msg: "failed to update to database."});
                        });
                } else {
                    resp.status(403);
                    resp.json({success: false, msg: "not the owner of the question"});
                }
            })
            .catch(function (err) {
                resp.status(400);
                resp.json({success: false, msg: "error in fetching user details"});
            });
    }
}
