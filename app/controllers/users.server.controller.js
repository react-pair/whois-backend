var User = require('mongoose').model('User');

module.exports = {

  render_signup_form: function(req, res) {
    res.render('../views/pages/signup', {
      title: 'Signup Here!'
    });
  }

  // show_profile: function(req, res) {
  //   res.send('../views/layout', {
  //
  //   })
  // }

};
