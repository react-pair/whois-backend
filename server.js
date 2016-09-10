var express = require('express');
var app = express();

app.listen(3333, function() {
  console.log('whois backend server running on localhost:3333');
});

// Handling a GET request
app.get('/', function(req, res) {
  res.send('Hello World!');
});
