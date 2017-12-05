var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var commentSchema = new Schema({
  id: {type : Number},
  comment : {type: String},
  user: {type: Schema.Types.ObjectId, ref: 'user'},
  doc : {type : String},
  doc_id : {type : String}, 
  created_on: {type: Date, default: Date.now},
  updated_on: {type: Date}
}, { usePushEach: true });

// the schema is useless so far
// we need to create a model using it
var comment = mongoose.model('comment', commentSchema);

// make this available to our users in our Node applications
module.exports = comment;