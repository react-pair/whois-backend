var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  displayName: {
    type: String,
    required: true
  },
  contactNum: {
    type: Number,
    required: true,
    unique: true,
    index: true
  },
  email: {
    type: String,
    required: true,
    index: true,
    unique: true,
    match: /.+\@.+\..+/
  },
  password: {
    type: String,
    required: true,
    validate: [
      function(password) {
        return password.length >= 6;
      },
      'Password should be longer'
    ]
  },
  position: {
    type: String,
    required: true
  },
  companyLogo: {
    type: String
  },
  profilePic: {
    type: String
  }
});

UserSchema.set('toJSON', {
  getters: true,
  virtuals: true
});

mongoose.model('User', UserSchema);
