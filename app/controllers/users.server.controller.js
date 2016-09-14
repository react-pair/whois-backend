var User = require('mongoose').model('User');
var cloudinary = require('cloudinary');

var self = module.exports = {

  checkUserExists: function(req, res, email, password){
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
        position: req.session.user.position,
        profilePic: req.session.user.profilePic
      });
    }
  },

  show_update_form: function(req, res) {
    res.render('pages/edit', {
      id: req.session.user.id,
      name: req.session.user.displayName,
      email: req.session.user.email,
      contact: req.session.user.contactNum,
      position: req.session.user.position,
      profilePic: req.session.user.profilePic
    });
  },

  update_profile: function(req, res, next) {

    User.findOne({
      _id: req.session.user.id
    }, function(err, user){

      if (err) return next(err);
      user.displayName = req.body.displayName;
      user.email = req.body.email;
      user.contactNum = req.body.contactNum;
      user.position = req.body.position;

      cloudinary.v2.uploader.upload(
        req.files.profilePic.path, function(error, result){
          if (error) next(error);

          // user.profilePic = result.secure_url;

          user.save(function(err){
            if(err) return next(err);
            req.session.user = user;
            console.log('session updated');
            res.redirect('/users/' + user._id);
          });
        }
      );

    })



    // User.findByIdAndUpdate(req.session.user.id, req.body, {new: true}, function(err ,user) {
    //   if (err) {
    //     return next(err);
    //   } else {
    //     req.session.user = user;
    //     console.log('session updated');
    //     res.redirect('/users/' + user._id);
    //   }
    // });
  },

  delete_account: function(req, res, next) {
    User.remove({_id:req.session.user.id}, function(err) {
      if (err) {
        return next(err);
      } else {
        res.redirect('/');
      }
    });
  }

};
