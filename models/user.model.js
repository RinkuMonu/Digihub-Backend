const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true, // Email remains unique
        required: true
    },
    mobile: {
        type: String, // No more unique constraint
        required: false,
        default: null
    },
    password: {
        type: String
    },
    registerDate: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('users', User);
