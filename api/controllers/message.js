const Conversation = require('../models/conversation');
const Message = require('../models/message');
exports.create_message = (req, res) => {
  Conversation.findById(req.params.conversationId).then(conversation => {
    const message = new Message({
      text: req.body.text,
      userId: req.body.userId
    })
  })
}

exports.load_messages =  (req, res) => {
   Conversation.findById(req.params.conversationId)
    .populate('messages')
    .then(conversation => {
      if(conversation) {
        res.status(200).json({
          id: conversation._id, messages: conversation.messages
        })
      }else {
        res.status(404).json({
          result: "Cannot find conversation"
        })
      }
    })
}