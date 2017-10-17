var UserUtil = require('../data/users');
var User = require('../model/user');

module.exports.postUser = function(req, res){
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });
    UserUtil.addUser(newUser, function(err, user) {
        if (err) {
            console.log("Not able to add user to db.");
            res.json({success: false, msg: 'Failed to add user'});
        } else {
            res.json({success: true, msg: 'Successfully added user name' + user.name});
        }
    });
};