const Doctor = require('../models/doctor');

exports.get_all_doctors = (req,res) => {
  Doctor.find()
    .then(doc => {
      res.status(200).json({
        docs:doc
      })
    })
    .catch(err => {
      res.status(400).json({
        err
      })
    })
}

exports.get_unauthenticated_doctors = (req, res) => {
  Doctor.find({ 'isVerified': false })
    .then(doc => res.status(200).json({docs:doc}))
    .catch(err => res.status(200).json({err}))
}

exports.get_authenticated_doctors = (req, res) => {
  Doctor.find({ 'isVerified': true })
    .then(doc => res.status(200).json({docs:doc}))
    .catch(err => res.status(200).json({err}))
}