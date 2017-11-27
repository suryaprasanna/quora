// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var answerSchema = new Schema({
  id: {type : Number},
  answer : {type: String},
  user: {type: Schema.Types.ObjectId, ref: 'user'},
  upvotes: {type: Number},
  downvotes : {type: Number},
  is_anonymous : {type: Boolean},
  // _creator : { type: Schema.Types.ObjectId, ref: 'question' },
  comments : [{type: Schema.Types.ObjectId, ref: 'comment'}],
  created_on: {type: Date, default: Date.now},
  updated_on: {type: Date}
}, { usePushEach: true });

// the schema is useless so far
// we need to create a model using it
var answer = mongoose.model('answer', answerSchema);

// make this available to our users in our Node applications
module.exports = answer;