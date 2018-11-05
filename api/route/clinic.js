const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Clinic = require('../models/clinic');
const _ = require('lodash');
const upload = require('../config/multer');
const ClinicController = require('../controllers/clinic');
const checkAuth = require('../middleware/check-auth');

//get clinic
router.get('/:idLocation',ClinicController.get_clinic);
//get all clinic
router.get('/',ClinicController.get_all_clinic);
//create new clinic
router.post('/',upload.array('imageUrls', 8), ClinicController.create_new_clinic);
//follow a clinic by idLocation and need current userID in body
router.post('/follow/:idLocation',checkAuth, ClinicController.follow_clinic);

router.post('/unfollow/:idLocation', ClinicController.unfollow_clinic);
//update coordinates and address
router.patch('/modify/:idLocation', ClinicController.modify_clinic);
//comment on clinic
router.patch('/comment/:idLocation', ClinicController.comment_on_clinic);

module.exports = router;