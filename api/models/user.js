const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber: {
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
    profileImageUrl: {
        type: String
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    follows : [Schema.Types.ObjectId]
});
UserSchema.plugin(uniqueValidator)
const User = mongoose.model('users', UserSchema);

module.exports = User;
