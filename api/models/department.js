const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DepartmentSchema = new Schema({
  name: {
    type: String,
  },
  locations: [{
    type: Schema.Types.ObjectId, ref: 'locations'
  }],
  doctor: [{
    type: Schema.Types.ObjectId, ref: 'users'
  }]
});

const Deparment = mongoose.model('departments', DepartmentSchema);

module.exports = Deparment;
