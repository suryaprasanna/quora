var answerUtil = require('../data/answers');
var answer = require('../model/answer');

module.exports = {
    // getAnswers : function(req, res){
    //     questionUtil.getQuestions(function(err, ques) {
    //         if (err) {
    //             console.log("Not able to get questions from db.");
    //             res.json({success: false, msg: 'Failed to get list of questions'});
    //         } else {
    //             console.log(ques);
    //             console.log("in else");
    //             res.json(ques);
    //         }
    //     });
    // },

    putAnswer : function(req, res) {
        console.log("aq " + req);
        let a1 = new answer();
        a1.user_id = req.body.user_id;
        a1.is_anonymous = req.body.is_anonymous;
        a1.votes = 0;
        a1.created_on = new Date();
        a1.updated_on = new Date();

        answerUtil.putAnswer(a1, req.body.question_id, req.body.name, function(err, resp){
            if (err) {
                console.log("Not able to get questions from db.");
                res.json({success: false, msg: 'Failed to save answer to db'});
            } else {
                console.log("hi resp " + resp);
                res.json({success: true, body: resp, msg: 'Successfully saved answer to db'});
            }
        });
    },

    editAnswer : function(req, resp) {
        let id = req.body.id;
        let answer = req.body.name;
        let user_id = req.body.user_id;
        console.log(id);
        answerUtil.getAnswer(id)
            .then((a) => {
                console.log(a.e_id);
                if (a.user_id === user_id) {
                    answerUtil.editAnswer(a.e_id, answer)
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