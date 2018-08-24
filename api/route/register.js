const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const validateRegisterInput = require('../validation/register');

const User = require('../models/user');
router.post('/',(req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
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
                error:err
            })
        })
})
module.exports = router