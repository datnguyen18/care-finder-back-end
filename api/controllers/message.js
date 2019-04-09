const Conversation = require('../models/conversation');

exports.load_messages =  (req, res) => {
  await Conversation.findById(req.params.conversationId)
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