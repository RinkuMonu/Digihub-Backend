const axios = require('axios');
const crypto = require('crypto');

// Configurations
const merchantId = process.env.PHONEPE_MERCHANT_ID;
const secretKey = process.env.PHONEPE_SECRET_KEY;
const baseUrl = process.env.PHONEPE_API_BASE_URL;

// Generate HMAC Signature 
const generateSignature = (data, secretKey) => {
    return crypto.createHmac('sha256', secretKey).update(data).digest('hex');
};

// Initiate Payment       
exports.initiatePayment = async (amount) => {
    const transactionId = `txn_${Date.now()}`; // Unique transaction ID
    const paymentData = {
        merchantId,
        transactionId,
        amount: amount * 100, // Convert amount to paise
        currency: 'INR',
        callbackUrl: `${process.env.BASE_URL}/api/payment/paymentverification`,
    };

    // Create signature payload
    const payload = `${transactionId}|${paymentData.amount}|${paymentData.currency}`;
    const signature = generateSignature(payload, secretKey);

    try {
        const response = await axios.post(`${baseUrl}/v1/checkout`, paymentData, {
            headers: {
                'Content-Type': 'application/json',
                'X-VERIFY': `${signature}###${secretKey.slice(-6)}`, // Include signature and secret key suffix
            },
        });

        return {
            transactionId,
            redirectUrl: response.data.redirectUrl, // Payment page URL
        };
    } catch (error) {
        console.error('Error initiating payment:', error.response?.data || error.message);
        throw new Error('Failed to initiate payment');
    }
};

// Verify Signature
exports.verifySignature = (transactionId, paymentId, signature) => {
    const payload = `${transactionId}|${paymentId}`;
    const expectedSignature = generateSignature(payload, secretKey);
    return expectedSignature === signature;
};
