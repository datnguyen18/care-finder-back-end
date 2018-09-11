const mongoose = require('mongoose');


const Schema = mongoose.Schema;
const ReviewSchema = require('./review');
const ClinicSchema = new Schema({
    _idDoctor: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    address: {
        street: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        type: Object,
        required:true
    },
    department: {
        type: String,
        required: true
    },
    phoneNumber :{
        type: String,
        required: true
    },
    imageUrls : [{
        type: String,
        required: true
    }],
    rating: {
        type: Number
    },
    coordinates : {
        lat: String,
        lng: String
    },
    timePeriod: {
        from: Date,
        to: Date
    },
    review: [ReviewSchema],
    numberOfFollows : {
        type: Number,
        default: 0
    }
});

const Clinic = mongoose.model('clinics', ClinicSchema);
module.exports = Clinic;
