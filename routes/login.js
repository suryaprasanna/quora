var UserUtil = require('../data/users');
var User = require('../model/user');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

module.exports.authenticate = function(req, res){
    
    const username = req.body.username;
    const password = req.body.password;

    UserUtil.getUserbyname(username, function(err, user) {
        if (err) {
            //console.log("Not able to add user to db.");
            res.status(500);
            res.json({success: false, msg: err});
        } 
        if(!user) {
          res.status(400);
            res.json({success: false, msg: 'User not found'});
        }
        UserUtil.comparePassword(password, user.password,function(err,isValid){
            if(err){
                res.status(500);
                res.json({success: false, msg: err});
            }
            if (isValid) {
                const token = jwt.sign({data: user}, config.secret); 
                res.status(200);
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
                  res.status(403);
                 res.json({success: false, msg: 'Wrong password'}); 
              }
        })
    });

    
};