const Reservation = require('../models/reservation');
const Location = require('../models/location');
const mongoose = require('mongoose');

//this func is for user book a reservation on a location
exports.book_reservation = (req, res) => {
  const { idPatient, idLocation } = req.body
  const reservation = new Reservation({idPatient, idLocation})
  reservation.save()
    .then(result => {
      console.log(result)
      res.status(200).json({result})
    })
    .catch(err => {
      console.log(err)
      res.status(400).json({err})
    })
}

//list all user in a reservation of a location
exports.show_all_users = (req, res) => {

}