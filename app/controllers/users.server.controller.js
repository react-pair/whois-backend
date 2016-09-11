var User = require('mongoose').model('User');

module.exports = {

  render_signup_form: function(req, res) {
    res.render('../views/signup', {
      title: 'Signup Here!'
    });
  }

};
