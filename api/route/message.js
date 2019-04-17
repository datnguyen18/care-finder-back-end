const express = require('express');
const router = express.Router();

const MessageController = require('../controllers/message');
//create message
router.post('/:idConversation', MessageController.create_message);
//load mess
router.get('/:idConversation', MessageController.load_messages);

module.exports = router