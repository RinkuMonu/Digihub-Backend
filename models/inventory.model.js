const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InventorySchema = new Schema({
    productID: { type: Schema.Types.ObjectId, ref: 'products' },
    stock: Number,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("inventory", InventorySchema);
