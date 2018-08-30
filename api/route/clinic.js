const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Clinic = require('../models/clinic');

router.post('/', (req,res) => {

    const clinic = new Clinic({
        _id: new mongoose.Types.ObjectId(),
        _idDoctor: req.body._idDoctor,
        name: req.body.name,
        address: req.body.address,
        department: req.body.department,
        phoneNumber: req.body.phoneNumber,
        imageUrl: req.body.imageUrl
    })

    clinic.save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Handling POST requests to /clinic ',
                createdClinic: clinic
            })
        })
        .catch(err => {
            res.status(500).json({
                error:err
            })
        })
})
module.exports = router;