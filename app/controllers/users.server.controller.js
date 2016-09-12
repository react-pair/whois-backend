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
        var email = user.email;
        var password = user.password;
        User.findOne({email: email, password: password}, function(err, user) {
          if(err) {
            console.log(err);
            res.redirect('/');
            return res.status(500).send();
          }
          if (!user) {
            res.redirect('/');
            return res.status(404).send();
          } else {
            req.session.user = user;
            res.redirect('/' + user._id);
            return res.status(200).send();
          }
        });
        // res.redirect('/' + user._id);
      }
    });
  },

  render_login_form: function(req, res) {
    res.render('../views/pages/login');
  },

  login: function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    User.findOne({email: email, password: password}, function(err, user) {
      if(err) {
        console.log(err);
        res.redirect('/');
        return res.status(500).send();
      }
      if (!user) {
        res.redirect('/');
        return res.status(404).send();
      } else {
        req.session.user = user;
        res.redirect('/' + user._id);
        return res.status(200).send();
      }
    });
  },

  show_profile: function(req, res, err) {
    var user_id = req.params.id;
    if(!req.session.user) {
      return res.status(401).send();
    } else {
      return res.status(200).render('../views/pages/profile', {
        name: req.session.user.displayName,
        email: req.session.user.email,
        contact: req.session.user.contact,
        position: req.session.user.position
      });
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
        res.redirect('/' + user._id);
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
