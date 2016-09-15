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
      // console.log('userobjects[0] is ', userObjects[0]);
      // console.log('requests:', userObjects[0].sender_id[0].displayName);
    });
  },

  show_pri_friends: function(req, res, next) {
    var user = req.session.user;
    console.log('logged in user:', user);
    Rs.find({
      $and: [
        {rs_type: 2},
        { $or: [{sender_id: user._id}, {receiver_id: user._id}] }
      ]
    }).populate('receiver_id sender_id')
      .exec(function(err, contacts) {
        if(err) next(err);
        console.log('contacts: ', contacts);
        console.log('receiver_id_obj: ', contacts[0].receiver_id);
        console.log('sender_id_obj: ', contacts[0].sender_id);
      });

    // function(err, contacts) {
    //   if (err) next(err);
    //   console.log('contacts:', contacts);
    //   res.render('pages/contact', {
    //     contacts: contacts
    //   });
    // });
  },

  establish_rs: function(req, res, next) {
    var rs = new Rs(req.body);
    console.log(req.body);
    rs.save (function(err) {
      if (err) {
        return next(err);
      } else {
        res.redirect('/contacts/' + req.session.user._id);
      }
    });
  },

  accept_request: function(req, res, next) {
    console.log('reqboddddddy:', req.body);
    Rs.findByIdAndUpdate(req.body._id, req.body, {new: true}, function(err ,user) {
      if (err) {
        return next(err);
      } else {
        console.log('friendship accepted');
        res.redirect('/requests/' + req.session.user._id);
      }
    });

  }

};
