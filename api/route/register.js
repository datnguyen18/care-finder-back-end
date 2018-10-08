const express = require('express');
const router = express.Router();
const RegisterController = require('../controllers/register');

const upload = require('../config/multer');

router.post('/', RegisterController.register_user);
router.post('/verify', RegisterController.verify_phone_number);
router.post('/doctor', upload.fields([{ name: 'imageOfIdentification' }, { name: 'imageOfDiploma' }]), RegisterController.register_doctor)

module.exports = router