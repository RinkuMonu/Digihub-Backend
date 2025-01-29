const mongoose = require('mongoose');

const Schema = mongoose.Schema

const Address = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    fname: {
        type: String
    },
    lname: {
        type: String
    },
    mobile: {
        type: Number
    },
    altermobile: {
        type: Number
    },
    country: {
        type: String
    },
    state: {
        type: String
    },
    city: {
        type: String
    },
    pincode: {
        type: Number
    },
    address: {
        type: String
    },
    addtype: {
        type: String
    }
});

module.exports = mongoose.model("addresses", Address)
