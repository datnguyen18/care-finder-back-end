const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Doctor = require('../models/doctor');
router.patch('/:idDoctor',(req,res) => {
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