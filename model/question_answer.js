// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var questionAnswerSchema = new Schema({
  id: {type : Number},
  q_id : {type: String},
  // user: { type: String},
  a_id: {type: String},
  // is_anonymous : {type: Boolean},
  // category_id: {type : Number},
  created_on: {type: Date},
  updated_on: {type: Date, default: Date.now}
});

// the schema is useless so far
// we need to create a model using it
var questionAnswer = mongoose.model('question_answer', questionAnswerSchema);

// make this available to our users in our Node applications
module.exports = questionAnswer;