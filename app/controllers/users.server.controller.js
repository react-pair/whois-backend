var User = require('mongoose').model('User');

module.exports = {

  render_signup_form: function(req, res) {
    res.render('../views/pages/signup', {
      title: 'Signup Here!'
    });
  },

  save_user: function(req, res, next) {
    var user = new User(req.body);
    user.save (function(err) {
      if (err) {
        return next(err);
      } else {
        res.redirect('/' + user._id);
      }
    });
  },

  show_profile: function(req, res, err) {
    var user_id = req.params.id;
    console.log(user_id);

    if(User.find(user_id)) {
      res.send('goodbye muthafuckers');
    } else {
      next(err);
    }
  },

  show_update_form: function(req, res) {
    // form for editing profile/namecard
  },

  update_profile: function(req, res, next) {
    User.findByIdAndUpdate(req.user.id, req.body, function(err ,user) {
      if (err) {
        return next(err);
      } else {
        res.json(user);
        redirect('/:user_id');
      }
    });
  },

  render_del_page: function(req, res) {
    // ask if they're certain that they're deleting their account
  },

  delete_account: function(req, res, next) {
    req.user.remove(function(err) {
      if (err) {
        return next(err);
      } else {
        res.json(req.user);
        redirect('/');
      }
    });
  }

};
