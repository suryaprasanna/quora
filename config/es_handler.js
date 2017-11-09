var client = require('./es_connection.js');


module.exports = {

  search: function (index, type, value) {
    var promise = new Promise(function (resolve, reject) {
      resolve(client.search({
          index: index,
          type: type,
          body : {
            query : {
              match: {
                name : value
              }
            }
          }
        }));
    });
    return promise;
  },

  createIndex:  function (index) {

    var promise = new Promise(function (resolve, reject) {
      resolve(client.indices.create({
        index: index
      }));
    });
    return promise;

    // client.indices.create({  
    //   index: req.index
    // },function(err,resp,status) {
    //   if(err) {
    //     console.log(req.index + " index already exists.");
    //     res.json({success: false, msg: req.index + " index already exists."});
    //   }
    //   else {
    //     res.json({success: true, msg: req.index + " index created."});
    //     console.log(req.index + " index created.");
    //   }
    // });
  },
  
  createDocument: function (index, type, name) {

    var promise = new Promise(function (resolve, reject) {
      resolve(client.index({  
        index: index,
        type: type,
        body: {
          name : name
        }
      }));
    });
    return promise;
  },

  updateDocument: function(index, id, type, name) {
    var promise = new Promise(function (resolve, reject) {
      resolve(client.index({  
        id: id,
        index: index,
        type: type,
        body: {
          name : name
        }
      }));
    });
    return promise;
  },

    // client.index({  
    //   index: index,
    //   id:req.id,
    //   type: req.type,
    //   body: {
    //     name : req.name
    //   }
    // },function(err,resp,status) {
    //   console.log(resp);
    //   if (err) {
    //     callback(err);
    //   } else {
    //     // res.json({success: false, msg: 'Failed to get list of questions'});
    //     callback("inserted");
    //   }
    // });
  // },
  getDocument: function (index, type, id) {
    var promise = new Promise(function (resolve, reject) {
      resolve(client.get({
        index: index,
        type: type,
        id: id
      }));
    });
    // client.get({
    //   index: index,
    //   type: type,
    //   id: id
    // }, function (error, response) {
    //   if (error) {
    //     callback("error occured");
    //   } else {
    //     callback(response);
    //   }
    // });
  }

}