const User = require('../models/user');

exports.get_all_doctors = (req,res) => {
  User.find({isDoctor: true})
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
  User.find({ 'requireVerify': true })
    .then(doc => res.status(200).json({doctors:doc}))
    .catch(err => res.status(200).json({err}))
}

exports.get_authenticated_doctors = (req, res) => {
  User.find({ 'permission': 'DOCTOR' })
    .then(doc => res.status(200).json({docs:doc}))
    .catch(err => res.status(200).json({err}))
}