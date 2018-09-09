const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema;

const DoctorSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    gender: {
        type: String,
        required: true
    },
    profileImage: {
        type: String
    },
    follows : [Schema.Types.ObjectId],
    numberOfFollowers: {
        type: Number,
        default: 0
    },
    imageOfIdentification:{
        type:String,
        required: true
    },
    imageOfDiploma: {
        type:String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    }
});
DoctorSchema.plugin(uniqueValidator)
const Doctor = mongoose.model('doctors', DoctorSchema);

module.exports = Doctor;
