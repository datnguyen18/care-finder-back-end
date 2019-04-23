const express = require('express');
const router = express.Router();
const reservation = require('../controllers/reservation');

router.post('/', reservation.book_reservation);

module.exports = router;