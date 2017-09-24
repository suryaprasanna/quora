const express = require('express');
const router = express.Router();

const User = require('../models/user');

//sign up
router.post('/signup',function(req,res){
    console.log('TEST'+req.body);
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
      });

    User.addUser(newUser, function(err,user){
        if(err){
            console.log('not able to add user to db');
            res.json({success: false, msg: 'Failed to add user'});
        }
        else{
            res.json({success: true, msg: 'Successfully added user'});
        }
    });
    //res.send('SIGN UP FORM');
});

//Authenticate
router.post('/authenticate',function(req,res){
    res.send('AUTHENTICATE FORM');
});


module.exports = router;