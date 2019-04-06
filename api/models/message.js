const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  text :{
    type: String
  },
  userId: {
    type: Schema.Types.ObjectId
  },
  createdAt: {
    type: Date.now()
  }
})