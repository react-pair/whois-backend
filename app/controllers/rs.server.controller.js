var Rs = require('mongoose').model('Rs');

module.exports = {

  show_request_list: function(req, res, next) {
    var user = req.session.user;
    Rs.find({receiver_id: user._id, rs_type: 1})
    .populate('sender_id')
    .exec(function(err, userObjects) {
      if (err) next (err);
      res.render('pages/requests', {
        requests: userObjects
      });
      console.log('userobjects[0] is ', userObjects[0]);
      console.log('requests:', userObjects[0].sender_id[0].displayName);
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
    var rs = new Rs(req.body);
    rs.save (function(err) {
      if (err) {
        return next(err);
      } else {
        res.redirect('/contacts/' + req.session.user._id);
      }
    });
  },

  accept_request: function(req, res, next) {

  }

};
