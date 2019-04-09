const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  text: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userId: Object,
})

module.exports = mongoose.model('messages', MessageSchema)