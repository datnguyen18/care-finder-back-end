const Reservation = require('../models/reservation');
const Location = require('../models/location');
const User = require('../models/user');
const mongoose = require('mongoose');
const QRCode = require('qrcode');

//this func is for user book a reservation on a location
exports.book_reservation = (req, res) => {
  const { idPatient, idLocation, date, time } = req.body
  const reservation = new Reservation({ idPatient, idLocation, date, time })
  reservation.save()
    .then(result => {
      let qrCode = "";
      Location.findById(idLocation).exec().then(location => {
        qrCode += location.name;
        User.findById(idPatient).exec().then(user => {
          if(user.imageOfReservation != ""){
            return res.status(200).json({"status": "You have booked an appointment already!"});
          }
          qrCode += " - " + user.email + " - " + date + " " + time;
          QRCode.toDataURL(qrCode, (err, url) => {
            User.findByIdAndUpdate(idPatient, { $set: { imageOfReservation: url } }, { new: true }).exec().then(user => {
              Location.updateOne({ '_id': idLocation, 'timeBooking.date': date }, { $set: { "timeBooking.$.time.$[element].userId": user._id } }, {
                multi: true,
                arrayFilters: [{ "element.time": time }]
              }).exec();
            })
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

exports.get_reservation = (req, res) => {
  User.findById(req.params.idPatient).exec()
    .then(result => {
      res.status(200).json({imageOfReservation: result.imageOfReservation})
    })
    .catch(err => {
      res.status(400).json({err})
    })
}

exports.cancel_reservation = (req, res) => {
  const { idPatient, idLocation, date, time } = req.body
  Location.findById(idLocation).exec().then(location => {
    User.findByIdAndUpdate(idPatient, { $set: { imageOfReservation: "" } }, { new: true }).exec().then(user => {
      Location.updateOne({ '_id': idLocation, 'timeBooking.date': date }, { $set: { "timeBooking.$.time.$[element].userId": "" } }, {
        multi: true,
        arrayFilters: [{ "element.time": time }]
      }).exec();
    })
    res.status(200).json({ "url":  ""});
  });
}

//list all user in a reservation of a location
exports.show_all_users = (req, res) => {

}