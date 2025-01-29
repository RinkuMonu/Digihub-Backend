const express = require('express');
const phonepeInstance = require('../phonepe');  // Import PhonePe logic
const crypto = require("crypto");

const db = require("../db/db");

const dbOrder = db.Order;

const router = express.Router();

// PhonePe checkout
router.post('/checkout/phonepe', async (req, res) => {
    const { amount, orderId } = req.body;

    if (!amount || amount <= 0) {
        return res.status(400).json({ error: 'Invalid amount. Please provide a valid amount.' });
    }
    if (!orderId) {
        return res.status(400).json({ error: 'Order ID is required.' });
    }

    try {
        const { transactionId, redirectUrl } = await phonepeInstance.initiatePayment(amount, orderId);
        res.status(200).send({ transactionId, redirectUrl });
    } catch (error) {
        console.error('Payment initiation failed:', error.message);
        res.status(500).json({ error: 'Failed to initiate payment. Please try again later.' });
    }
});

// Payment verification for PhonePe                          
router.post('/paymentverification/phonepe/:id', async (req, res) => {
    const { transactionId, paymentId, signature } = req.body;
 
    try {
        const isValid = phonepeInstance.verifySignature(transactionId, paymentId, signature);

        if (isValid) {
            await dbOrder.findOneAndUpdate({ _id: req.params.id }, { paymentStatus: "SUCCESS" });
            return res.redirect(`${process.env.CLIENT_URL}/checkout/ordersuccess?reference=${paymentId}`);
        } else {
            res.status(400).json({ error: 'Invalid signature. Payment verification failed.' });
        }
    } catch (error) {
        console.error('Error in payment verification:', error.message);
        res.status(500).json({ error: 'Payment verification failed. Please try again later.' });
    }
});

module.exports = router;
