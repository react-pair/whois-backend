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
        var friendsArray = contacts.map(function(item){
          if (user._id === item.sender_id[0]._id) {
            return item.receiver_id[0];
          } else {
            return item.sender_id[0];
          }
        });
        console.log('contacts: ', contacts);
        console.log('friends: ', friendsArray);
        res.render('pages/contact',{
          friends: friendsArray,
          contacts: contacts
        });
      });
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
    Rs.findByIdAndUpdate(req.body._id, req.body, {new: true}, function(err ,user) {
      if (err) {
        return next(err);
      } else {
        res.redirect('/requests/' + req.session.user._id);
      }
    });
  },

  delete_contact: function(req, res, next) {
    console.log(req.body);
    Rs.remove({_id: req.body}, function(err) {
      if(err) next(err);
      res.redirect('/contacts/' + req.session.user._id);
    });
  }

};
