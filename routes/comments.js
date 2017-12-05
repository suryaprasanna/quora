var answerUtil = require('../data/answers');
var answer = require('../model/answer');
var question = require('../model/question');
var questionUtil = require('../data/questions');
var commentUtil = require('../data/comments');
var comment = require('../model/comment');

module.exports = {
    commentOnQues : function(req, res){
        var newComment = new comment();
        newComment.user = req.body.user_id;
        newComment.comment = req.body.comment;
        newComment.doc = "questions";
        newComment.doc_id = req.body.question_id;
        
        newComment.save()
            .then((data) => {
                commentUtil.commentOnQues(data, data.doc_id)
                    .then((data1) => {
                        res.status(200);
                        res.json({success: true, body:data, msg: 'successfully posted comment for question'});
                    })
                    .catch((err) => {
                        console.log("Error while posting a comment " + err);
                        res.status(400);
                        res.json({success: false, msg: 'Failed to post a comment'});
                    });
            })
            .catch(function (err) {
                resp.status(500);
                resp.json({success: false, msg: "Failed at the Database end"});
            });
       
    },

    commentOnAns : function(req, res) {
        console.log("req body: "+JSON.stringify(req.body));
        var newComment = new comment();
        newComment.user = req.body.user_id;
        newComment.comment = req.body.comment;
        newComment.doc = "answers";
        newComment.doc_id = req.body.answer_id;

        console.log("ans id is: "+req.body.answer_id);
        newComment.save()
            .then((data) => {
                commentUtil.commentOnAns(data, req.body.answer_id)
                    .then((data) => {
                        res.status(200);
                        res.json({success: true, body:data.comments, msg: 'successfully posted comment for answer'});
                    })
                    .catch((err) => {
                        console.log("Error while posting a comment "+err);
                        res.status(400);
                        res.json({success: false, msg: 'Failed to post a comment'});
                    });
            })
            .catch(function (err) {
                resp.status(500);
                resp.json({success: false, msg: "Failed at the Database end"});
            });
        
    }

}
