const Conversation = require('../models/conversation');

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