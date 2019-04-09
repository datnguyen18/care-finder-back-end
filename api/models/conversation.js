const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
  messages: [{
    type: Schema.Types.ObjectId, ref: 'messages'
  }],
  userOneId: String,
  userTwoId: String,
})
const Conversation = mongoose.model('conversation', ConversationSchema)
module.exports = Conversation