var Rs = require('mongoose').model('Rs');

module.exports = {

  show_pri_friends: function(req, res) {
    res.render('pages/contact', {
      // TEMPORARY!!! Change to relationships DB after testing
      id: req.session.user.id,
      name: req.session.user.displayName,
      email: req.session.user.email,
      contact: req.session.user.contactNum,
      position: req.session.user.position
    });
  }

};
