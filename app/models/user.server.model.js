var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
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
    type: String,
    required: true
  },
  profilePic: {
    type: String,
    required: true
  }
});

UserSchema.virtual('fullName')
  .get(function() {
    return this.firstName + ' ' + this.lastName;
  })
  .set(function(fullName) {
    var splitName = fullName.split(' ');
    this.firstName = splitName[0] || '';
    this.lastName = splitName[1] || '';
  });

UserSchema.statics.findOneByUsername = function(username,
  callback) {
  this.findOne({
    username: new RegExp(username, 'i')
  }, callback);
};

UserSchema.set('toJSON', {
  getters: true,
  virtuals: true
});

mongoose.model('User', UserSchema);
