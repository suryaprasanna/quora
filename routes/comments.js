var answerUtil = require('../data/answers');
var answer = require('../model/answer');
var question = require('../model/question');
var questionUtil = require('../data/questions');
var commentUtil = require('../data/comments');
var comment = require('../model/comment');

module.exports = {
    commentOnQues : function(req, res){
        var newComment = new comment();
        newComment.user_id = req.body.user_id;
        newComment.comment = req.body.comment;
        newComment.doc = "question";
        newComment.doc_id = req.body.question_id;
        
        newComment.save()
            .then((data) => {
                commentUtil.commentOnQues(data, data.doc_id)
                    .then((data1) => {
                        res.json({success: true, body:data, msg: 'successfully posted comment for question'});
                    })
                    .catch((err) => {
                        console.log("Error while posting a comment " + err);
                        res.json({success: false, msg: 'Failed to post a comment'});
                    });
            })
       
    },

    commentOnAns : function(req, res) {
        console.log("req body: "+JSON.stringify(req.body));
        var newComment = new comment();
        newComment.user_id = req.body.user_id;
        newComment.comment = req.body.comment;
        newComment.doc = "answer";
        newComment.doc_id = req.body.answer_id;

        console.log("ans id is: "+req.body.answer_id);
        newComment.save()
            .then((data) => {
                commentUtil.commentOnAns(data, req.body.answer_id)
                    .then((data) => {
                        res.json({success: true, body:data.comments, msg: 'successfully posted comment for answer'});
                    })
                    .catch((err) => {
                        console.log("Error while posting a comment "+err);
                        res.json({success: false, msg: 'Failed to post a comment'});
                    });
            })
        
    },

    commentOnComment : function(req, resp) {
        var newComment = new comment();
        newComment.user_id = req.body.user_id;
        newComment.comment = req.body.comment;
        newComment.doc = "comment";
        //newComment.doc_id = req.body.answer_id;

        newComment.save()
            .then((data) => {
                commentUtil.commentOnComment(data)
                    .then((data) => {
                        res.json({success: true, msg: 'successfully posted comment for comment'});
                    })
                    .catch((err) => {
                        console.log("Error while posting a comment "+err);
                        res.json({success: false, msg: 'Failed to post a comment'});
                    });
            })
    }

}
