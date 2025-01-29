// shipping.controller.js
const express = require('express');
const router = express.Router();
const shippingService = require('../services/shipping.services'); 

// Route to create a new shipping order
router.post("/new", async (req, res) => {
    try {
        const response = await shippingService.createShipping(req); // Function call
        res.status(201).json(response);
    } catch (err) {
        console.error("Error creating shipping order:", err);
        res.status(500).json({ 
            responseCode: 0,
            message: "An error occurred while creating the shipping order.",
            error: err.message,
        });
    }
}); 

// Route to find shipping information by userID
router.get("/", async (req, res) => {
    try {
        const response = await shippingService.findShipping(req);
        if (!response || !response.result) {
            return res.status(404).json({
                responseCode: 0,
                message: "Shipping information not found for this user.",
            });
        }
        res.status(200).json(response);
    } catch (err) {
        console.error("Error finding shipping information:", err);
        res.status(500).json({
            responseCode: 0,
            message: "An error occurred while fetching shipping information.",
            error: err.message,
        });
    }
});


// Route to delete a shipping order
router.delete("/:shippingId", async (req, res) => {
    try {
        const response = await shippingService.deleteShipping(req);
        res.status(200).json(response);
    } catch (err) {
        console.error("Error deleting shipping order:", err);
        res.status(500).json({
            responseCode: 0,
            message: "An error occurred while deleting the shipping order.",
            error: err.message,
        });
    }
});

// Route to update shipping status
router.patch("/:shippingId", async (req, res) => {
    try {
        const response = await shippingService.updateShippingStatus(req);
        res.status(200).json(response);
    } catch (err) {
        console.error("Error updating shipping status:", err);
        res.status(500).json({
            responseCode: 0,
            message: "An error occurred while updating the shipping status.",
            error: err.message,
        });
    }
});

// Route to track shipping status
router.get("/trackshipping/:shippingId", async (req, res) => {
    try {
        const response = await shippingService.trackShipping(req);
        res.status(200).json(response);
    } catch (err) {
        console.error("Error tracking shipping order:", err);
        res.status(500).json({
            responseCode: 0,
            message: "An error occurred while tracking the shipping order.",
            error: err.message,
        });
    }
});

// Route to calculate shipping costs
router.post("/calculatedeliverycost", async (req, res) => {
    try {
        const response = await shippingService.calculateDeliveryCost(req);
        res.status(200).json(response);
    } catch (err) {
        console.error("Error calculating delivery cost:", err);
        res.status(500).json({
            responseCode: 0,
            message: "An error occurred while calculating delivery cost.",
            error: err.message,
        });
    }
});

// Route to get shipping history for a user
router.get("/shippinghistory", async (req, res) => {
    try {
        const response = await shippingService.getShippingHistory(req);
        res.status(200).json(response);
    } catch (err) {
        console.error("Error fetching shipping history:", err);
        res.status(500).json({
            responseCode: 0,
            message: "An error occurred while fetching the shipping history.",
            error: err.message,
        });
    }
});

module.exports = router;
