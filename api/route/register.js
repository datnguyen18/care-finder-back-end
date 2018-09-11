const express = require('express');
const router = express.Router();

const multer = require('multer');
const RegisterController = require('../controllers/register');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname)
  }
})

const upload = multer({ storage: storage })



router.post('/', RegisterController.register_user)

router.post('/doctor', upload.fields([{ name: 'imageOfIdentification' }, { name: 'imageOfDiploma' }]), RegisterController.register_doctor)

module.exports = router