var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

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
  app.route('/users/:user_id')
     .get(usersController.show_profile)
     .put(multipartMiddleware, usersController.update_profile);

  // // profile/namecard update page
  app.route('/edit/:user_id')
     .get(usersController.show_update_form);

  // account delete page
  app.route('/delete/:user_id')
     .delete(usersController.delete_account);

  // search for user
  app.route('/search')
     .post(usersController.search_user);

 };

 // invitation page
 // app.route('/:user_id/invite')
 //    .get(usersController.invitation)
 //    .post(usersController.invitation);
