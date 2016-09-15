module.exports = function(app) {
  var rsController = require('../controllers/rs.server.controller');

  // show primary friends list of individual user (read relationships)
  app.route('/contacts/:user_id')
     .get(rsController.show_pri_friends)
     .post(rsController.establish_rs);

  // invite users to be friends (create new relationship; rs_type: 1)
  app.get('/requests/:user_id', rsController.show_request_list);

  // accept invitation (update instantiated relationship to rs_type: 2)
  app.put('/accept/:user_id', rsController.accept_request);

  // // delete contacts (update relationship to to rs_type: 0)
  // app.put('/delete/:user_id', rsController.delete_contact);

};
