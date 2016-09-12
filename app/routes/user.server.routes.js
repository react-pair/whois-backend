module.exports = function(app) {
  var usersController = require('../controllers/users.server.controller');

  // restful USER routes

  // signup page
  app.route('/signup')
     .get(usersController.render_signup_form)
     .post(usersController.save_user);

  // login page
  app.route('/')
     .get(usersController.render_login_form)
     .post(usersController.login);

  // profile page of individual user
  app.get('/:user_id', usersController.show_profile);

  // // profile/namecard update page
  app.route('/:user_id/edit')
     .get(usersController.show_update_form)
     .put(usersController.update_profile);

  // account delete page
  app.route('/:user_id/delete')
     .delete(usersController.delete_account);

 };

 // primary friends list of individual user
 // app.get('/:user_id/contacts', usersController.show_pri_friends);

 // invitation page
 // app.route('/:user_id/invite')
 //    .get(usersController.invitation)
 //    .post(usersController.invitation);
