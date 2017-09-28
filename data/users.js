var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {
    useMongoClient: true,
    /* other options */
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
//   console.log('we are connected!');
});