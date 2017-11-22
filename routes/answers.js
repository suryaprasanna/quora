var answerUtil = require('../data/answers');
var answer = require('../model/answer');
var question = require('../model/question');
var questionUtil = require('../data/questions');

module.exports = {
    getAnswers : function(req, res){
        questionUtil.getQuestions(function(err, ques) {
            if (err) {
                console.log("Not able to get questions from db.");
                res.json({success: false, msg: 'Failed to get list of questions'});
            } else {
                console.log(ques);
                console.log("in else");
                res.json(ques);
            }
        });
    },

    putAnswer : function(req, res) {
        console.log("aq " + req);
        var a1 = new answer();
        a1.user_id = req.body.user_id;
        a1.answer = req.body.name;
        a1.is_anonymous = req.body.is_anonymous;
        a1.votes = 0;
        a1.created_on = new Date();

        questionUtil.getQuestion(req.body.question_id)
            .then((q) => {
                answerUtil.putAnswer(a1, q)
                    .then((data) => {
                        res.json({success: true, msg: 'Successfully saved answer to db'});
                    })
                    .catch(function (err) {
                        console.log("Not able to get questions from db.", err);
                        res.json({success: false, msg: 'Failed to save answer to db'});
                    });
            })
            .catch( function (err) {
                res.json({success: false, msg: 'Failed to get question for given qid.'});
            });
    },

    editAnswer : function(req, resp) {
        var id = req.body.answer_id;
        var answer = req.body.name;
        var user_id = req.body.user_id;
        console.log(id);
        answerUtil.getAnswer(id)
            .then((ans) => {
                if (ans.user_id === user_id) {
                    answerUtil.editAnswer(ans, answer)
                        .then((data) => {
                            resp.json({success: true, msg: "updated succesfully"});
                        })
                        .catch(function (err) {
                            console.log(err);
                            resp.json({success: false, msg: "failed to update to database."});
                        });
                } else {
                    resp.json({success: false, msg: "not the owner of the answer"});
                }
            })
            .catch(function (err) {
                console.log(err);
                resp.json({success: false, msg: "error in fetching user details"});
            });
    },

    upvote : function(req, resp) {

    },

    downvote : function(req, resp) {

    }
}
