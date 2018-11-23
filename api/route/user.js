const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');
const checkAuth = require('../middleware/check-auth');
const upload = require('../config/multer');

router.get('/me', checkAuth, UserController.get_current_user);
router.patch('/:idUser', checkAuth, upload.fields([{ name: 'imageOfIdentification' }, { name: 'imageOfDiploma' }]), UserController.require_be_doctor);
router.patch('/', checkAuth, upload.single('avatar'), UserController.update_user);
router.get('/:idUser', UserController.get_user);
module.exports = router;