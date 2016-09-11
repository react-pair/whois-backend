var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InvSchema = new Schema({
  sender_id: [
    {
      type: Schema.Type.ObjectId, ref: 'User'
    }
  ],
  receiver_id: [
    {
      type: Schema.Type.ObjectId, ref: 'User'
    }
  ]
});

mongoose.model('Inv', InvSchema);
