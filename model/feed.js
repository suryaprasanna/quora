// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var feedSchema = new Schema({
  id: {type : Number},
  title : {type : String},
  question : {type: Schema.Types.ObjectId, ref: 'question'},
  topic : {type: Schema.Types.ObjectId, ref: 'topic'},
  user : {type: Schema.Types.ObjectId, ref: 'user'},
  user_id: {type: String},
  created_on: {type: Date, default: Date.now}
});

// the schema is useless so far
// we need to create a model using it
var feed = mongoose.model('feed', feedSchema);

// make this available to our users in our Node applications
module.exports = feed;