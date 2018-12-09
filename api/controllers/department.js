const Department = require('../models/department');
const mongoose = require('mongoose');

exports.get_all_departments = (req, res) => {
  Department.find().populate(['locations', 'users']).then(doc => {
    res.status(200).json({doc})
  }).catch(err => {
    res.status(400).json({err})
  });
}

exports.add_department = (req, res) => {
  const department = new Department({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name
  })

  department.save()
    .then(doc => {
      res.status(200).json({doc})
    }).catch(err => {
      res.status(400).json({err})
    })
}