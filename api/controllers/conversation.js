const Conversation = require('../models/conversation');
const User = require('../models/user');
exports.create_conversation= (req, res) => {
  User.findOne({ email: req.body.currentEmaillUser})
    .populate('conversations')
    .then(user => {
      if(user) {
        const isConversationExist = user.conversations.filter(conversation =>(
          conversation.userOneId === req.body.personId ||
          conversation.userTwoId ===req.body.personId
        ),).length >0
        
        if(isConversationExist) {
          res.status(400).json({result: "You already have conversation with this user'"})
        }else {
          User.findById(req.body.personId)
            .then(person =>{
              const newConversation = new Conversation({
                userOneId: user._id,
                userTwoId: person._id
              });
              newConversation.save().then(conversation => {
                user.conversations.push(conversation);
                user.save();
                person.conversations.push(conversation);
                person.save();
                res.status(200).json({id: conversation._id, personId :person._id})
              })
            })
        }
      }else {
        res.status(404).json({result: "User not found"})
      }
    })
}

exports.load_conversations = (req, res) => {
  // Tai lam tiep nha
}

exports.does_the_conversation_exist = (req, res) => {
    const userId = req.params.idUser;
    const doctorId = req.params.idDoctor;

    Conversation.find({ userId: userId, doctorId: doctorId })
        .then(con => {
            res.status(200).json({ result: true })
        })
        .catch(err => {
            res.status(400).json({ result: false })
        })
}