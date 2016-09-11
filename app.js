var express = require('./config/express');
var mongoose = require('./config/mongoose');
// mongoose.connect('mongodb://localhost/whoisDB');
// require('./models/user.server.model');

// var users = require('./routes/users');

var db = mongoose();
var app = express();
// var mongo_url = process.env.MONGODB_URI || 'mongodb://benyang00:Apr261985@ds029446.mlab.com:29446/whois';
// mongoose.connect(mongo_url);

app.set('port', (process.env.PORT || 3333));

app.listen(app.get('port'), function() {
  console.log('Express server is running on localhost:', app.get('port'));
});

module.exports = app;
