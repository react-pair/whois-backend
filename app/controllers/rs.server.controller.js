var Rs = require('mongoose').model('Rs');

module.exports = {

  show_pri_friends: function(req, res) {
    res.render('pages/contact');
  }

};
