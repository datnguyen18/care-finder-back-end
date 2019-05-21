const express = require('express');
const router = express.Router();
const reservation = require('../controllers/reservation');

router.post('/', reservation.book_reservation);
router.get('/:idPatient', reservation.get_reservarion);

module.exports = router;