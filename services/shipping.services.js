const db = require('../db/db');
const dbShipping = db.Shipping;
const shipping = require('../models/shipping.model')
const mongoose = require("mongoose")
// Create a new shipping order
async function createShipping(req) {
    try {
        const { address, items } = req.body;
        const userID = req.userId;
       
        if (!userID || !address || !items || items.length === 0) {
            return { responseCode: 0, message: "Missing required fields: userID, address, or items." };
        }

        const newShipping = new dbShipping({
            userID: userID,
            address: address,
            items: items,
            shippingStatus: 'pending',
        });

        const result = await newShipping.save();  // Save the new shipping order
        return { responseCode: 1, result };
    } catch (err) {
        console.error("Error in createShipping service:", err);
        throw new Error("An error occurred while creating the shipping order.");
    }
}

// Find shipping information by userID
async function findShipping(req) {
    try {
        const userID = req.userId;

        if (!userID) {
            return { responseCode: 0, message: "Missing userID." };
        }

        const result = await dbShipping.find({ userID }).populate('address').populate('items');
        return { responseCode: 1, result };
    } catch (err) {
        console.error("Error in findShipping service:", err);
        throw new Error("An error occurred while fetching shipping information.");
    }
}

// Delete shipping order
async function deleteShipping(req) {
    try {
        const { shippingId } = req.params;

        if (!shippingId) {
            return { responseCode: 0, message: "Missing shippingId." };
        }

        const deletedShipping = await dbShipping.findByIdAndDelete(shippingId);
        return { responseCode: 1, result: deletedShipping };
    } catch (err) {
        console.error("Error in deleteShipping service:", err);
        throw new Error("An error occurred while deleting the shipping order.");
    }
}

async function updateShippingStatus(req) {
    try {
        const { shippingId } = req.params;
        const { status } = req.body;

        if (!shippingId || !status) {
            return { responseCode: 0, message: "Missing required fields: shippingId or status." };
        }

        // Find the existing shipping order
        const shippingOrder = await dbShipping.findById(shippingId);

        if (!shippingOrder) {
            return { responseCode: 0, message: "Shipping order not found." };
        }

        // Add the new status to the statusHistory array
        shippingOrder.statusHistory.push({ status, timestamp: new Date() });

        // Update the current shippingStatus field
        shippingOrder.shippingStatus = status;

        // Save the updated shipping order
        const updatedShipping = await shippingOrder.save();

        return { responseCode: 1, result: updatedShipping };
    } catch (err) {
        console.error("Error in updateShippingStatus service:", err);
        throw new Error("An error occurred while updating the shipping status.");
    }
}


// Track shipping status
async function trackShipping(req) {
    try {
        const {shippingId} = req.params;

        if (!shippingId) {
            return { responseCode: 0, message: "Missing shippingId." };
        }

        const result = await dbShipping.findById(shippingId);
        return { responseCode: 1, result };
    } catch (err) {
        console.error("Error in trackShipping service:", err);
        throw new Error("An error occurred while tracking the shipping order.");
    }
}

// Calculate delivery cost
async function calculateDeliveryCost(req) {
    try {
        const { weight, distance } = req.body;

        if (!weight || !distance) {
            return { responseCode: 0, message: "Missing required fields: weight or distance." };
        }

        const cost = weight * distance * 0.5; // Simple cost calculation
        return { responseCode: 1, result: { deliveryCost: cost } };
    } catch (err) {
        console.error("Error in calculateDeliveryCost service:", err);
        throw new Error("An error occurred while calculating the delivery cost.");
    }
}

// Get shipping history for a user
async function getShippingHistory(req) {
    try {
        const userId = req.userId;

        if (!userId) {
            return { responseCode: 0, message: "Missing userId." };
        }

        const history = await dbShipping.find({ userID: userId }).sort({ createdAt: -1 });
        console.log(history)
        return { responseCode: 1, result: history };
    } catch (err) {
        console.error("Error in getShippingHistory service:", err);
        throw new Error("An error occurred while fetching the shipping history.");
    }
}

// Export all functions
module.exports = {
    createShipping,
    findShipping,
    deleteShipping,
    updateShippingStatus,
    trackShipping,
    calculateDeliveryCost,
    getShippingHistory
};
