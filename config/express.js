var config = require('./config');
var express = require('express');
var morgan = require('morgon');
var compress = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var expressLayouts = require('express-ejs-layouts');
var session = require('express-session');

module.exports = function() {
  var app = express();

  if (! process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  } else if (process.env.NODE_ENV === 'production') {
    app.use(compress());
  }

  app.use(bodyParser.urlencoded({
    extended: false
  }));

  app.use(bodyParser.json());
  app.use(methodOverride());

  // app.use(session({
  //   saveUninitialized: true,
  //   resave: true,
  //   secret: config.sessionSecret
  // }));

  app.set('views', './app/views');
  app.set('view engine', 'ejs');
  app.use(expressLayouts);

  // require('../app/routes/index.server.routes')(app);
  // require('../app/routes/user.server.routes')(app);
  // require('../app/routes/post.server.routes')(app);
  // require('../app/routes/person.server.routes')(app);

  app.use(express.static('./public'));

  return app;
};
