// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  name: {type : String, required: true} ,
  email: {type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
  following : [{type: Schema.Types.ObjectId, ref: 'user'}],
  followers : [{type: Schema.Types.ObjectId, ref: 'user'}],
  topics : [{type: Schema.Types.ObjectId, ref: 'topic'}],
 
  // admin: Boolean,
  // location: String,
  // meta: {
  //   age: Number,
  //   website: String
  // },
  created_at: {type: Date, default: Date.now},
  updated_at: {type : Date}
});

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('user', userSchema);

// make this available to our users in our Node applications
module.exports = User;