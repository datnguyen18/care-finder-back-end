const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const doctorController = require('../controllers/doctor');
//get all doctors
router.get('/', doctorController.get_all_doctors );

//get unauthenticated doctors
router.get('/unauthenticated', doctorController.get_unauthenticated_doctors);

//get authenticated doctors
router.get('/authenticated', doctorController.get_authenticated_doctors);

//authenticate doctor
router.patch('/verify/:idDoctor',(req,res) => {
    const id = req.params.idDoctor;
    Doctor.findOneAndUpdate({_id: id},{$set: {isVerified: req.body.isVerified}},{new: true})
        .exec()
        .then(result => {
            if(!result){return res.status(500).json({error:"Id not found"})}
            console.log(result);
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json({error: err})
        });
})
module.exports = router;