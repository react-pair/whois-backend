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
    type: Number,
    required: true
  }
});

mongoose.model('Rs', RsSchema);
