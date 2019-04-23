const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const ReservationSchema = new Schema({
  idLocation: Schema.Types.ObjectId,
  qrCode: Number,
  idPatient: {
    type: Schema.Types.ObjectId
  },
  time: Number
})

module.exports = mongoose.model('reservations', ReservationSchema)