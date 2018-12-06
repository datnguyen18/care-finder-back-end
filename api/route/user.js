const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');
const checkAuth = require('../middleware/check-auth');
const upload = require('../config/multer');

router.get('/me', checkAuth, UserController.get_current_user);
router.patch('/verify/:idUser', checkAuth, upload.fields([{ name: 'imageOfIdentificationFront' },{ name: 'imageOfIdentificationBack' }, { name: 'imageOfDiploma' }]), UserController.require_be_doctor);
router.patch('/', checkAuth, upload.single('avatar'), UserController.update_user);
router.patch('/:idUser', checkAuth, UserController.update_information_user);
router.get('/:idUser', UserController.get_user);
router.patch('/password/:idUser', checkAuth, UserController.change_password)
module.exports = router;