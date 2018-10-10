const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');

router.get('/', UserController.get_current_user);
