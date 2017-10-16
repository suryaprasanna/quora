var questionUtil = require('../data/questions');
var question = require('../model/question');

module.exports.getQuestions = function(req, res){
    console.log("test1");
    
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
};

module.exports.askQuestion = function(req, res) {
    let ques = new question({
        question:req.body.question
    });
    questionUtil.askQuestion(ques, function(err, ques){
        if (err) {
            console.log("Not able to get questions from db.");
            res.json({success: false, msg: 'Failed to get list of questions'});
        } else {
            res.json({success: true, msg: 'Successfully saved question to db'});
        }
    });
}