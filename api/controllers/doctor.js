const User = require('../models/user');

exports.authourize_user = (req, res) => {
  const id = req.params.idUser;

  User.findByIdAndUpdate(id, { $set: {permission: 'DOCTOR'}}, {new: true}).exec()
    .then(doctor => {
      res.status(200).json({doctor})
    }).catch(error => {
      res.status(400).json({error})
    }) 
}

exports.get_unauthenticated_doctors = (req, res) => {
  User.find({ 'requireVerify': true, 'permission': 'USER' })
    .then(doc => res.status(200).json({doctors:doc}))
    .catch(err => res.status(200).json({err}))
}

exports.get_authenticated_doctors = (req, res) => {
  User.find({ 'permission': 'DOCTOR' })
    .then(doc => res.status(200).json({docs:doc}))
    .catch(err => res.status(200).json({err}))
}