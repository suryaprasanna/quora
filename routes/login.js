var UserUtil = require('../data/users');
var User = require('../model/user');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

module.exports.authenticate = function(req, res){
    console.log("hello");
    console.log(req.body.name);
    
    const username = req.body.username;
    const password = req.body.password;

    UserUtil.getUserbyname(username, function(err, user) {
        if (err) {
            //console.log("Not able to add user to db.");
            res.json({success: false, msg: err});
        } 
        if(!user) {
            res.json({success: false, msg: 'User not found'});
        }
        UserUtil.comparePassword(password, user.password,function(err,isValid){
            if(err){
                res.json({success: false, msg: err});
            }
            if (isValid) {
                const token = jwt.sign({data: user}, config.secret); 
                res.json({
                  success: true,
                  token: 'JWT '+token,
                  user: {
                    id: user._id,
                    name: user.name,
                    username: user.username,
                    email: user.email
                  }
                });
              } else {
                 res.json({success: false, msg: 'Wrong password'}); 
              }
        })
    });

    
};