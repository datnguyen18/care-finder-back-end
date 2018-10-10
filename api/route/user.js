const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');
const checkAuth = require('../middleware/check-auth');
router.get('/me',checkAuth, UserController.get_current_user);

module.exports = router;
