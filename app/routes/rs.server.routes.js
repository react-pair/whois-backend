module.exports = function(app) {
  var rsController = require('../controllers/rs.server.controller');

  // show primary friends list of individual user
  app.get('/contacts/:user_id', rsController.show_pri_friends);
};
