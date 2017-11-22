var mongoose = require('mongoose');
var User = require('../model/user');
var bcrypt = require('bcryptjs');

//module.exports.addUser = function(newUser, callback){
//    newUser.save(callback);
//}

module.exports.getUserbyname = function(username,callback){
    const query = {username: username}
    User.findOne(query,callback);
}

module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(newUser.password, salt, function (err, hash) {
        if(err) throw err;
        newUser.password = hash;
        newUser.save(callback);
      });
    });
}
  
module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword,hash,function(err,isValid){
        if(err) throw err;
        callback(null, isValid);
    });
}
