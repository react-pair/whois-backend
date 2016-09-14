var config = require('./config');
var express = require('express');
var morgan = require('morgan');
var compress = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var expressLayouts = require('express-ejs-layouts');
var session = require('express-session');
const MongoStore = require('connect-mongo')(session);
var cloudinary = require('cloudinary');

module.exports = function() {
  var app = express();

  if (! process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  } else if (process.env.NODE_ENV === 'production') {
    app.use(compress());
  }

  app.use(function(req, res, next){
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Methods", "DELETE,PUT,PATCH");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
		next();
	});
  app.use(methodOverride('_method'));

  app.use(bodyParser.urlencoded({
    extended: false
  }));

  app.use(bodyParser.json());


  app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: "r3@ct-p4Ir",
    store: new MongoStore(options)
    // secret: config.sessionSecret
  }));

  // cloudinary configuration
  cloudinary.config({
    cloud_name: config.CLOUDINARY_NAME,
    api_key: config.CLOUDINARY_KEY,
    api_secret: config.CLOUDINARY_SECRET
  })


  app.set('views', './app/views');
  app.set('view engine', 'ejs');
  app.use(expressLayouts);

  require('../app/routes/user.server.routes')(app);
  // require('../app/routes/rs.server.routes')(app);

  app.use(express.static('./public'));

  return app;
};
