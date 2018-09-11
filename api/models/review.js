const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema;
const ReviewSchema = new Schema({
    idUser: Schema.Types.ObjectId,
    content: String,
    date: Date,
    rating:{
        location: Number,
        price: Number,
        quality: Number,
        attitude: Number
    }
})
module.exports = ReviewSchema;