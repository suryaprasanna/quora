var mongoose = require('mongoose');
var User = require('../model/user');

module.exports.addUser = function(newUser, callback){
    newUser.save(callback);
}

module.exports.getUserbyname = function(username,callback){
    const query = {username: username}
    User.findOne(query,callback);
}