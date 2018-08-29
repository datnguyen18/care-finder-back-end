const mongoose = require('mongoose');


const Schema = mongoose.Schema;

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
    imageUrl : {
        type: String,
        required: true
    },
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
    review: [{
        id: Schema.Types.ObjectId,
        content: String,
        date: Date,
        rating:{
            location: Number,
            price: Number,
            quality: Number,
            attitude: Number
        }
    }],
    numberOfFollows : {
        type: Number,
        default: 0
    }
});

const Clinic = mongoose.model('clinics', ClinicSchema);
module.exports = Clinic;
