// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var questionsSchema = new Schema({
  id: {type : Number, required: true},
  question: {type: String, required: true},
  answer: { type: String},
  user: { type: String, required: true, unique: true },
  category_id: {type : Number},
  date: {type:String}
});

// the schema is useless so far
// we need to create a model using it
var question = mongoose.model('Question', questionSchema);

// make this available to our users in our Node applications
module.exports = question;