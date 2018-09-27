const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema;
const ReviewSchema = new Schema({
    _idUser: {
        type: Schema.Types.ObjectId,
        required:true
    },
    content: {
        type:String,
        required: true
    },
    date: Date,
    rating:{
        location: Number,
        price: Number,
        quality: Number,
        attitude: Number
    }
})

const Review = mongoose.model('reviews', ReviewSchema);
module.exports = Review;