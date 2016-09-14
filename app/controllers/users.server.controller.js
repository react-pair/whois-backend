var User = require('mongoose').model('User');

var self = module.exports = {

  checkUserExists: function(req, res, email, password){
    User.findOne({email: email, password: password}, function(err, user) {
      if(err) {
        res.redirect('/');
        return res.status(500).send();
      }
      if (!user) {
        res.redirect('/');
        return res.status(404).send();
      } else {
        req.session.user = user;
        res.redirect('/users/' + user._id);
        return res.status(200).send();
      }
    });
  },

  render_signup_form: function(req, res) {
    res.render('pages/signup', {
      title: 'Signup Here!'
    });
  },

  save_user: function(req, res, next) {
    var user = new User(req.body);
    user.save (function(err) {
      if (err) {
        return next(err);
      } else {
        self.checkUserExists(req, res, user.email, user.password);
        // res.redirect('/' + user._id);
      }
    });
  },

  render_login_form: function(req, res) {
    res.render('pages/login');
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
        res.redirect('/users/' + user._id);
        return res.status(200).send();
      }
    });
  },

  show_profile: function(req, res, err) {
    if(!req.session.user) {
      return res.status(401).send();
    } else {
      return res.status(200).render('pages/profile', {
        id: req.session.user.id,
        name: req.session.user.displayName,
        email: req.session.user.email,
        contact: req.session.user.contactNum,
        position: req.session.user.position
      });
    }
  },

  show_update_form: function(req, res) {
    res.render('pages/edit', {
      id: req.session.user.id,
      name: req.session.user.displayName,
      email: req.session.user.email,
      contact: req.session.user.contactNum,
      position: req.session.user.position
    });
  },

  update_profile: function(req, res, next) {
    User.findByIdAndUpdate(req.session.user.id, req.body, {new: true}, function(err ,user) {
      if (err) {
        return next(err);
      } else {
        req.session.user = user;
        console.log('session updated');
        res.redirect('/users/' + user._id);
      }
    });
  },

  delete_account: function(req, res, next) {
    User.remove({_id:req.session.user.id}, function(err) {
      if (err) {
        return next(err);
      } else {
        res.redirect('/');
      }
    });
  },

  search_user: function(req, res) {
    var search_email = req.body.email;
    User.findOne({ email: search_email }, function(err, user) {
      if(err) {
        res.redirect('/contacts/' + req.session.user._id);
        return res.status(500).send();
      }
      if(!user) {
        res.redirect('/contacts/' + req.session.user._id);
      } else {
        res.render('pages/usersummary', {
          receiver_id: user.id,
          name: user.displayName,
          email: user.email,
          contact: user.contactNum,
          position: user.position,
          sender_id: req.session.user._id
        });
      }
    });
  }

};
