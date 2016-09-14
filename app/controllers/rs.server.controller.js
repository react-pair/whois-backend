var Rs = require('mongoose').model('Rs');

module.exports = {

  show_request_list: function(req, res) {
    console.log(req.body);
    res.render('pages/requests', {

    });
  },

  show_pri_friends: function(req, res) {
    res.render('pages/contact', {
      // TEMPORARY!!! Change to relationships DB after testing
      id: req.session.user.id,
      name: req.session.user.displayName,
      email: req.session.user.email,
      contact: req.session.user.contactNum,
      position: req.session.user.position
    });
  },

  establish_rs: function(req, res, next) {
    console.log(req.body);
    var rs = new Rs(req.body);
    rs.save (function(err) {
      if (err) {
        return next(err);
      } else {
        res.redirect('/contacts/' + req.session.user._id);
      }
    });
  }

};
