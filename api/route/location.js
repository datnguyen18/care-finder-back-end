const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Clinic = require('../models/location');
const _ = require('lodash');
const upload = require('../config/multer');
const LocationController = require('../controllers/location');
const checkAuth = require('../middleware/check-auth');

//get clinic
router.get('/:idLocation',LocationController.get_Location);
//get all clinic
router.get('/',LocationController.get_all_Location);
//create new clinic
router.post('/',upload.array('imageUrls', 8), LocationController.create_new_location);
router.patch('/:idLocation', upload.array('imageUrls', 8), LocationController.edit_location);
//follow a clinic by idLocation and need current userID in body
router.post('/follow/:idLocation', LocationController.follow_location);

router.post('/unfollow/:idLocation', LocationController.unfollow_Location);
//update coordinates and address
router.patch('/modify/:idLocation', LocationController.modify_Location);
//comment on clinic
router.post('/comment/:idLocation', LocationController.comment_on_Location);
router.patch('/comment/:idLocation', LocationController.edit_comment);
router.post('/getBookingTime', LocationController.get_bookingTime);

module.exports = router;