const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Shipping schema
const ShippingSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: "users",  // Assuming you have a users collection
        required: true,
    },
    trackingNumber: String,
    address: {
        type: Schema.Types.ObjectId,
        ref: "addresses", 
        required: true,
    },
    shippingStatus: {
        type: String,
        enum: ['pending', 'shipped', 'delivered', 'cancelled', 'in-transit'],
        default: 'pending',
    },
    statusHistory: [{
        status: {
            type: String,
            enum: ['pending', 'shipped', 'delivered', 'cancelled', 'in-transit'],
            required: true,
            default: 'pending'
        },
        timestamp: {
            type: Date,
            default: Date.now
        }
    }],
    items: [{
        productID: { type: Schema.Types.ObjectId, ref: 'Product', required: true }
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    shippingDate: Date,
    deliveryDate: Date,
});

module.exports = mongoose.model("Shipping", ShippingSchema);
