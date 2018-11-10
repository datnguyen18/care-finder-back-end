const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const City = require('../models/city');

router.get('/', (req, res) => {
  City.find().then(doc => {
    res.status(200).json({doc})
  }).catch(err => {
    res.status(400).json({err})
  });
})
module.exports = router;