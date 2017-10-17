var mongoose = require('mongoose');
var question = require('../model/question');

module.exports.askQuestion = function(newQuestion, callback){
    newQuestion.save(callback);
}

module.exports.getQuestions = function(callback){
    const query = ({},{question: 1 });
    question.find({},{question: 1 }, callback);
}
