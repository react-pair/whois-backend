var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RsSchema = new Schema({
  user1_id: [
    {
      type: Schema.Type.ObjectId, ref: 'User'
    }
  ],
  user2_id: [
    {
      type: Schema.Type.ObjectId, ref: 'User'
    }
  ],
  rs_type: {
    type: Number,
    required: true
  }
});

mongoose.model('Rs', RsSchema);
