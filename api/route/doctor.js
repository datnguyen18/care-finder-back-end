const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const doctorController = require('../controllers/doctor');

//get unauthenticated doctors
router.get('/unauthenticated', doctorController.get_unauthenticated_doctors);

//get authenticated doctors
router.get('/authenticated', doctorController.get_authenticated_doctors);

//authenticate doctor
router.patch('/verify/:idDoctor',(req,res) => {
    const id = req.params.idDoctor;
    Doctor.findOneAndUpdate({_id: id},{$set: {permission: 'DOCTOR'}},{new: true})
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

router.patch('/authorization/:idUser', doctorController.authourize_user);
module.exports = router;