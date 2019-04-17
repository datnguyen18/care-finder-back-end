const express = require('express');
const router = express.Router();
const ConversationController = require('../controllers/conversation')

router.get("/check/:idUser/:idDoctor", ConversationController.does_the_conversation_exist);
//test load_conversations function
router.get("/loadConversations", ConversationController.load_conversations);

module.exports = router;