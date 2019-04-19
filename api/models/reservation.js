const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReservationSchema = new Schema({
  idLocation: Schema.Types.ObjectId,
  numberInQueue: Number,
  status: {
    type: Text,
    enum: ['waiting', 'checking', 'done']
  },
  idPatient: {
    type: Schema.Types.ObjectId
  }
})

module.exports = mongoose.model('reservations', ReservationSchema)