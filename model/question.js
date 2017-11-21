// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var questionSchema = new Schema({
  id: {type : Number},
  question : {type: String},
  e_id : {type: String},
  user_id: { type: String},
  upvotes: {type: Number},
  downvotes : {type: Number},
  is_anonymous : {type: Boolean},
  topics : [Number],
  answers : [Number],
  comments : [Number],
  created_on: {type: Date},
  updated_on: {type: Date, default: Date.now}
});

// the schema is useless so far
// we need to create a model using it
var question = mongoose.model('question', questionSchema);

// make this available to our users in our Node applications
module.exports = question;