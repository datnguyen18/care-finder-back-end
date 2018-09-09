const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const validateRegisterInput = require('../validation/register');
const bcrypt = require('bcrypt');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, new Date().toISOString()+ file.originalname)
    }
  })
  
const upload = multer({ storage: storage })

const User = require('../models/user');
const Doctor = require('../models/doctor');

router.post('/', (req, res) => {
    const {
        errors,
        isValid
    } = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            })
        } else {
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hash,
                gender: req.body.gender
            })
            user.save()
                .then(result => {
                    console.log(result);
                    res.status(200).json({
                        message: 'Handling POST requests to /register ',
                        createdUser: user
                    })
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    })
                })
        }
    })

})

router.post('/doctor', upload.fields([{name: 'imageOfIdentification'}, {name:'imageOfDiploma'}]), (req,res) => {
    console.log('====================================');
    console.log(req.files);
    console.log('====================================');
    const {
        errors,
        isValid
    } = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            })
        } else {
            const doctor = new Doctor({
                _id: new mongoose.Types.ObjectId(),
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hash,
                gender: req.body.gender,
                imageOfIdentification: "http://localhost:3000/uploads/"+req.files.imageOfIdentification[0].filename,
                imageOfDiploma: "http://localhost:3000/uploads/"+req.files.imageOfDiploma[0].filename
            })
            doctor.save()
                .then(result => {
                    console.log(result);
                    res.status(200).json({
                        message: 'Handling POST requests to /register ',
                        createdUser: doctor
                    })
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    })
                })
        }
    })
})

module.exports = router