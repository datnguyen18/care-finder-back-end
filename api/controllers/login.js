const mongoose = require('mongoose');
const validateLoginInput = require('../validation/login');
const bcrypt = require('bcrypt');
const jwt =require('jsonwebtoken');
const socket = require('../../server');
const User = require('../models/user');

exports.login = (req, res) => {
    const {errors, isValid} = validateLoginInput(req.body);
    if(!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({email: req.body.email})
        .exec()
        .then(user => {
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if(err) {
                  return res.status(401).json({
                    failed: 'Unauthorized Access'
                  });
                }                 
                if(result) {
                  const token = jwt.sign({
                    email: user.email,
                    userId: user._id
                  },process.env.JWT_KEY,
                  {
                      expiresIn: "10h"
                  })

                  return res.status(200).json({
                    success: 'Welcome to the JWT Auth',
                    token,
                    permission: user.permission
                  });
                 }

                 return res.status(401).json({
                    failed: 'Unauthorized Access'
                 });
            })
        })
        .catch(err => {
            res.status(500).json({
                error: 'Email not exist'
             });
        })

}