var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RsSchema = new Schema({
  sender_id: [
    {
      type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }
  ],
  receiver_id: [
    {
      type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }
  ],
  rs_type: {
    type: Boolean,
    required: true
  },
  invitation: {
    type: Boolean,
    require: true
  },
  accept: {
    type: Boolean,
    require: true
  }
});

mongoose.model('Rs', RsSchema);
