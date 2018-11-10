const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema;

const CitySchema = new Schema({
  id :{
    type: Number
  },
  code:{
    type: String
  },
  name:{
    type: String
  },
  districts: [{
    id:{
      type:String
    },
    name:{
      type: String
    },
    wards: [{
      id: Number,
      name: String,
      prefix: String
    }]
  }]
});
CitySchema.plugin(uniqueValidator)
const City = mongoose.model('cities', CitySchema);

module.exports = City;
