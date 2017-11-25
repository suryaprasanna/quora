// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var topicSchema = new Schema({
  id: {type : Number},
  topic : {type: String},
  followers : [{type: Schema.Types.ObjectId, ref: 'user'}],
  created_on: {type: Date, default: Date.now},
  updated_on: {type: Date}
}, { usePushEach: true });

// the schema is useless so far
// we need to create a model using it
var topic = mongoose.model('topic', topicSchema);

// make this available to our users in our Node applications
module.exports = topic;