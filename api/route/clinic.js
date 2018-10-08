const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Clinic = require('../models/clinic');
const _ = require('lodash');
const upload = require('../config/multer');
const ClinicController = require('../controllers/clinic');
const checkAuth = require('../middleware/check-auth');

router.get('/',(req,res) => {
    Clinic.find().then(doc => {
        res.status(200).send({all: doc})
    }).catch(err => {res.status(404).send({err:err})})
})
//get clinic
router.get('/:idClinic',ClinicController.get_clinic);
//get all clinic
router.get('/',ClinicController.get_all_clinic);
//create new clinic
router.post('/',upload.array('imageUrls', 8), ClinicController.create_new_clinic);
//follow a clinic by idClinic and need current userID in body
router.post('/follow/:idClinic',checkAuth, ClinicController.follow_clinic)

router.post('/unfollow/:idClinic', ClinicController.unfollow_clinic)
//update coordinates and address
router.patch('/modify/:idClinic', ClinicController.modify_clinic);
//comment on clinic
router.patch('/comment/:idClinic', ClinicController.comment_on_clinic);
module.exports = router;