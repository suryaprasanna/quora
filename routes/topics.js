var topicUtil = require('../data/topics');
var topic = require('../model/topic');
var Promises = require('promise');

module.exports = {
    getTopics : function(req, res){
		topicUtil.getTopics()
            .then((data) => {
                // console.log("qq: " + data);
                res.json({success: true, body: data, msg: "Successfully retrieved topics."});
            }).catch((err) => {
                res.json({success: false, msg: "Error in retieving topic."});
            });
    },

    createTopic : function(req, res) {
		var topic_name = req.param('topic');
        topicUtil.createTopic(topic_name)
            .then((data) => {
                // console.log("qq: " + data);
                res.json({success: true, body: data, msg: "Successfully created topic."});
            }).catch((err) => {
                res.json({success: false, msg: "Error in creating topic."});
            });
    },

    getTopic : function(req, res) {
    	var topic_id = req.param('topic_id');
        topicUtil.getTopic(topic_id)
            .then((data) => {
                // console.log("qq: " + data);
                res.json({success: true, body: data, msg: "Successfully retrieved topic."});
            }).catch((err) => {
                res.json({success: false, msg: "Error in retieving topic."});
            });
    }

}