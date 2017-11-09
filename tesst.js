var es_client = require('./config/es_handler.js');
// var a = require('./config/es_handler.js');


c = es_client.search("tutorial")//, "helloworld", "hello")
		.then((data) => {
			var d = data.hits.hits;
			// console.log(d);
			var len = d.length;
			var resbody = [];
			for (var i = 0; i < len; i++) {
				var o = d[i];
			  	// console.log(o);
			    resbody.push({
			  	qid : o._id,
			    question: o._source.message
			  })
			}
			console.log(resbody);
		})
		.catch(function (err) {
			console.log("error ", err);
		});
	// .then((d) => {
	// 	console.log(d);
	// })
	// .catch (function (err) {
	// 	console.log("error occured ", err);
	// });

