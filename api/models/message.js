const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  text: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userId: Schema.Types.ObjectId,
})

module.exports = mongoose.model('messages', MessageSchema)