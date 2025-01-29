const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Review = new Schema({
    product:{
        type:Schema.Types.ObjectId,
        ref:"products"
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"users"
    },
    rating: Number,
    comment: String,
    createdAt: {type:Date, default: Date.now },
})

module.exports = mongoose.model("reviews", Review);