// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var questionSchema = new Schema({
  id: {type : Number},
  question: {type: String, required: true},
  user: { type: String},
  category_id: {type : Number},
  date: {type:String}
});

// the schema is useless so far
// we need to create a model using it
var question = mongoose.model('Question', questionSchema);

// make this available to our users in our Node applications
module.exports = question;