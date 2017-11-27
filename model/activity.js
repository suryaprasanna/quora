// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var activitySchema = new Schema({
  id: {type : Number},
  doc : {type : String},
  type : {type: String},
  doc_id : {type : String},
  user: {type: Schema.Types.ObjectId, ref: 'user'},
  created_on: {type: Date, default: Date.now}
});

// the schema is useless so far
// we need to create a model using it
var activity = mongoose.model('activity', activitySchema);

// make this available to our users in our Node applications
module.exports = activity;