var es_client = require('../config/es_handler');
var Promises = require('promise');

module.exports = {

	searchQuery : function (req, resp) {
		var index = req.query.index;
		var type = req.query.type;
		var value = req.query.value;
		c = es_client.search(index, type, value)//, "helloworld", "hello")
				.then((data) => {
					var d = data.hits.hits;
					console.log(d);
					var len = d.length;
					var resbody = [];
					for (var i = 0; i < len; i++) {
						var o = d[i];
					  	// console.log(o);
					    resbody.push({
					  	qid : o._id,
					    question: o._source.name
					  })
					}
					console.log(resbody);
					resp.json({sucess: true, body: resbody});
				})
				.catch(function (err) {
					console.log("error ", err);
					resp.json({sucess: false, msg: err});
				});
	}

}