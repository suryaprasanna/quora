var answerUtil = require('../data/answers');
var answer = require('../model/answer');
var question = require('../model/question');
var questionUtil = require('../data/questions');

module.exports = {
    
    putAnswer : function(req, res) {
        let a1 = new answer();
        a1.user = req.body.user_id;
        a1.answer = req.body.name;
        a1.is_anonymous = req.body.is_anonymous;
        a1.votes = 0;
        a1.updated_on = new Date();
        questionUtil.getQuestion(req.body.question_id)
            .then((q) => {
                answerUtil.putAnswer(a1, q)
                    .then((data) => {
                        res.statusCode = 200;
                        res.json({success: true, body: data, msg: 'Successfully saved answer to db'});
                    })
                    .catch(function (err) {
                        console.log("Failed to save answer to db.", err);
                        res.status(400);
                        res.json({success: false, msg: 'Failed to save answer to db'});
                    });
            })
            .catch( function (err) {
                res.status(500);
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
                if (ans.user._id === user_id) {
                    answerUtil.editAnswer(ans, answer)
                        .then((data) => {
                            resp.status(200);
                            resp.json({success: true, msg: "updated succesfully"});
                        })
                        .catch(function (err) {
                            console.log(err);
                            resp.status(500);
                            resp.json({success: false, msg: "failed to update to database."});
                        });
                } else {
                    resp.status(403);
                    resp.json({success: false, msg: "not the owner of the answer"});
                }
            })
            .catch(function (err) {
                console.log(err);
                resp.status(500);
                resp.json({success: false, msg: "error in fetching user details"});
            });
    }
}