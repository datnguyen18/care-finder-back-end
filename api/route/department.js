const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Department = require('../models/department');

router.get('/', (req, res) => {
  Department.find().populate('locations').then(doc => {
    res.status(200).json({doc})
  }).catch(err => {
    res.status(400).json({err})
  });
})
module.exports = router;