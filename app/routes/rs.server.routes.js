module.exports = function(app) {
  var rsController = require('../controllers/rs.server.controller');

  // show primary friends list of individual user (read relationships)
  app.route('/contacts/:user_id')
     .get(rsController.show_pri_friends)
     .put(rsController.establish_rs);

  // invite friends (create new relationship)
  app.route('invite/:user_id')
      .get(rsController.render_inv_form)
      .post(rsController.instantiate_rs);

  // accept invitation (update instantiated relationship to rs_type: 1)
  app.get('/accept/:user_id', rsController.render_accept_page);

  // delete contacts (update relationship to to rs_type: 0)
  app.put('/delete/:user_id', rsController.delete_contact);

};
