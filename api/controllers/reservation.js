const Reservation = require('../models/reservation');
const Location = require('../models/location');
const User = require('../models/user');
const mongoose = require('mongoose');
const QRCode = require('qrcode');

//this func is for user book a reservation on a location
exports.book_reservation = (req, res) => {
  const { idPatient, idLocation, time } = req.body
  const reservation = new Reservation({ idPatient, idLocation, time })
  reservation.save()
    .then(result => {
      let qrCode = "";
      Location.findById(idLocation).exec().then(location => {
        qrCode += location.name;
        User.findById(idPatient).exec().then(user => {
          qrCode += " - " + user.email + " - " + time;
          QRCode.toDataURL(qrCode, (err, url) => {
            User.findByIdAndUpdate(idPatient, { $set: { imageOfReservation: url } }, { new: true }).exec().then()
            res.status(200).json({ "url": url });
          });
        })
      });
    })
    .catch(err => {
      console.log(err)
      res.status(400).json({ err })
    })
}

//list all user in a reservation of a location
exports.show_all_users = (req, res) => {

}