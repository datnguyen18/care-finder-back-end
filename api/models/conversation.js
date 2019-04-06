const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
  messages: [{
    type: Schema.Types.ObjectId, ref: 'messages'
  }],
  userId: {
    type: Schema.Types.ObjectId
  },
  doctorId: {
    type: Schema.Types.ObjectId
  }
})
const Conversation = mongoose.model('conversation', ConversationSchema)
module.exports = Conversation