var express = require('./config/express');
var mongoose = require('./config/mongoose');
var seeder = require('./config/mongoose-seed');
// mongoose.connect('mongodb://localhost/whoisDB');
// require('./models/user.server.model');

// var users = require('./routes/users');

var db = mongoose();
var app = express();
// mongoose.connect('mongodb://kai:kaikai@ds029436.mlab.com:29436/whois');


app.set('port', (process.env.PORT || 3333));

app.listen(app.get('port'), function() {
  console.log('Express server is running on localhost:', app.get('port'));
});

module.exports = app;
