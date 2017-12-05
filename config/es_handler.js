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

  getDocument: function (index, type, id) {
    var promise = new Promise(function (resolve, reject) {
      resolve(client.get({
        index: index,
        type: type,
        id: id
      }));
    });
  }

}