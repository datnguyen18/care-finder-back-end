const mongoose = require('mongoose');
const validateRegisterInput = require('../validation/register');
const bcrypt = require('bcrypt');

const User = require('../models/user');

const Client = require('authy-client').Client;
const authy = new Client({ key: process.env.API_KEY })
const enums = require('authy-client').enums;

exports.register_user = (req, res) => {
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
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        password: hash,
        gender: req.body.gender
      })
      authy.startPhoneVerification({
        countryCode: 'VN',
        locale: 'en',
        phone: req.body.phoneNumber,
        via: enums.verificationVia.SMS
      }, (error, response) => {
        if (error) {
          return console.log(error)
        };
      });
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
}

exports.verify_phone_number = (req, res) => {
  const code = req.body.code;
  const phoneNumber = req.body.phoneNumber;
  const id = req.body.userId;
  authy.verifyPhone({
    countryCode: 'VN',
    phone: phoneNumber,
    token: code
  }, (error, response) => {
    if (error) return res.status(404).send({
      "error": "code was wrong"
    });

    User.findByIdAndUpdate(id, {$set: {isVerified: true}}, {new: true}).exec().then((user) => {
      if (!user) {
        return res.status(404).send();
      }
      res.status(200).json({user})
    }).catch((e) => {
      res.status(400).send("Code was wrong")
    })
  });
}