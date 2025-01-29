const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DiscountSchema = new Schema({
    code: { type: String, unique: true },
    discountType: { type: String, enum: ['percentage', 'fixed'], required: true },
    discountValue: Number,
    validFrom: Date,
    validUntil: Date,
    status: { type: String, enum: ['active', 'expired'], default: 'active' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("discounts", DiscountSchema);
