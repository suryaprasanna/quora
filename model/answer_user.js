// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var answerUserSchema = new Schema({
  id: {type : Number},
  a_id : {type: String},
  // user: { type: String},
  user_id: {type: String},
  // is_anonymous : {type: Boolean},
  // category_id: {type : Number},
  created_on: {type: Date},
  updated_on: {type: Date, default: Date.now}
});

// the schema is useless so far
// we need to create a model using it
var answerUser = mongoose.model('answer_user', answerUserSchema);

// make this available to our users in our Node applications
module.exports = answerUser;