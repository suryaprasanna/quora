// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var activitySchema = new Schema({
  id: {type : Number},
  document : {type : String},
  type : {type: String},
  doc_id : {type : Number},
  user_id: { type: String},
  created_on: {type: Date},
  updated_on: {type: Date, default: Date.now}
});

// the schema is useless so far
// we need to create a model using it
var activity = mongoose.model('activity', answerSchema);

// make this available to our users in our Node applications
module.exports = activity;