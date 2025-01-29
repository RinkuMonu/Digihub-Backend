const db = require("../db/db");
const dbDiscount = db.Discount;

async function createDiscount(req, res) {
    try {
        const newDiscount = {
            code: req.body.code,
            discountType: req.body.discountType,
            discountValue: req.body.discountValue,
            validFrom: req.body.validFrom,
            validUntil: req.body.validUntil,
        };

        // Save the discount to the database
        const result = await new dbDiscount(newDiscount).save();
        console.log("Discount created:", result);

        // Return the result in the respo201nse
        res.status().json({ responseCode: 1, result }); // 201 Created
    } catch (err) {
        console.error("Error creating discount:", err); // Log the error
        res.status(500).json({ message: 'Error creating discount', error: err.message }); // 500 Internal Server Error
    }
}

async function getAllDiscounts(req, res) {
    try {
        const result = await dbDiscount.find();
        res.status(200).json({ responseCode: 1, result }); // 200 OK
    } catch (err) {
        console.error("Error fetching discounts:", err); // Log the error
        res.status(500).json({ message: 'Error fetching discounts', error: err.message }); // 500 Internal Server Error
    }
}

module.exports = { createDiscount, getAllDiscounts };
