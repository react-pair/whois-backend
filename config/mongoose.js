var config = require('./config');
var mongoose = require('mongoose');

module.exports = function() {
  mongoose.Promise = global.Promise;
  var db = mongoose.connect(config.db);
  require('../app/models/user.server.model');

  return db;
};
