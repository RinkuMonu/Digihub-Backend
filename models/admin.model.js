const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the admin schema (similar to User but may include admin-specific fields if needed)
const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'admin'
    },
    permissions: {
        type: [String], // Array of permissions or roles specific to the admin
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Hash the password before saving
adminSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Create the Admin model
const Admin = mongoose.model("admin", adminSchema);

module.exports = Admin;
