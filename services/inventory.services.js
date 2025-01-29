const db = require("../db/db");
const dbInventory = db.Inventory;

async function getAllInventory(req, res) {
    const result = await dbInventory.find().populate('productID');
    return { responseCode: 1, result };
}

async function updateInventory(req, res) {
    const updatedInventory = await dbInventory.findByIdAndUpdate(req.body.inventoryID, { stock: req.body.stock }, { new: true });
    return { responseCode: 1, result: updatedInventory };
}

module.exports = { getAllInventory, updateInventory };
