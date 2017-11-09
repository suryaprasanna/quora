// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var voteSchema = new Schema({
  id: {type : Number},
  type : {type: Number},
  user_id: { type: String},
  type_id: {type: String},
  value : {type: Number},
  // is_anonymous : {type: Boolean},
  // category_id: {type : Number},
  created_on: {type: Date},
  updated_on: {type: Date, default: Date.now}
});

// the schema is useless so far
// we need to create a model using it
// voteSchema.index({ type: 1, user_id: 1, type_id: 1 }, { unique: true });

var vote = mongoose.model('vote', voteSchema);
// make this available to our users in our Node applications
module.exports = vote;