const crypto = require('crypto');
const express = require("express");
const axios = require('axios');
const router = express.Router();

router.post("/add", async (req, res) => {
    try {
        console.log("Request Body: ", req.body);

        const merchantTransactionId = req.body.transactionId;
        const data = {
            merchantId: "M22104ANSVQVF",
            merchantTransactionId: merchantTransactionId,
            merchantUserId: req.body.MUID,
            name: req.body.name,
            amount: req.body.amount * 100,
            redirectUrl: `https://digihub-backend.onrender.com/payment/checkout/${merchantTransactionId}`,
            redirectMode: 'POST',
            mobileNumber: req.body.number,
            paymentInstrument: {
                type: 'PAY_PAGE'
            }
        };

        console.log("Data Payload: ", data);

        const payload = JSON.stringify(data);
        const payloadMain = Buffer.from(payload).toString('base64');
        console.log("Base64 Encoded Payload: ", payloadMain);

        const keyIndex = 1;
        const string = payloadMain + '/pg/v1/pay' + "d0d988b4-eb6e-4a37-8ed7-5a73760c09f8";
        console.log("String for Hashing: ", string);

        const sha256 = crypto.createHash('sha256').update(string).digest('hex');
        console.log("SHA256 Hash: ", sha256);

        const checksum = sha256 + '###' + keyIndex;
        console.log("X-VERIFY Header Value (Checksum): ", checksum);

        const prod_URL = "https://api.phonepe.com/apis/hermes/pg/v1/pay";
        const options = {
            method: 'POST',
            url: prod_URL,
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'X-VERIFY': checksum
            },
            data: {
                request: payloadMain
            }
        };

        console.log("Request Options: ", options);

        axios.request(options).then(function (response) {
            console.log("PhonePe Response: ", response.data);
            return res.send(response.data.data.instrumentResponse.redirectInfo.url);
        })
        .catch(function (error) {
            console.error("PhonePe API Error: ", error.response ? error.response.data : error.message);
            res.status(500).send({
                message: error.message,
                success: false
            });
        });

    } catch (error) {
        console.error("Error in /add route: ", error.message);
        res.status(500).send({
            message: error.message,
            success: false
        });
    }
});

router.post("/checkout/:id", async (req, res) => {
    try {
        console.log("Checkout Request Body: ", req.body);

        const merchantTransactionId = req.body.transactionId;
        const merchantId = req.body.merchantId;

        const keyIndex = 1;
        const string = `/pg/v1/status/${merchantId}/${merchantTransactionId} + "d0d988b4-eb6e-4a37-8ed7-5a73760c09f8"`;
        console.log("String for Hashing (Checkout): ", string);

        const sha256 = crypto.createHash('sha256').update(string).digest('hex');
        console.log("SHA256 Hash (Checkout): ", sha256);

        const checksum = sha256 + "###" + keyIndex;
        console.log("X-VERIFY Header Value (Checkout): ", checksum);

        const options = {
            method: 'GET',
            url: `https://api.phonepe.com/apis/hermes/pg/v1/status/${merchantId}/${merchantTransactionId}`,
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'X-VERIFY': checksum,
                'X-MERCHANT-ID': `${merchantId}`
            }
        };

        console.log("Request Options (Checkout): ", options);

        // Check payment status
        axios.request(options).then(async(response) => {
            console.log("Checkout Response: ", response.data);
            if (response.data.success === true) {
                const url = `https://www.fin-unique.com/success`;
                return res.redirect(url);
            } else {
                const url = `https://www.fin-unique.com/failure`;
                return res.redirect(url);
            }
        })
        .catch((error) => {
            console.error("Checkout API Error: ", error.response ? error.response.data : error.message);
            return res.status(500).send({
                message: error.message,
            });
        });

    } catch (error) {
        console.error("Error in /checkout route: ", error.message);
        res.status(500).send({
            message: error.message,
        });
    }
});

module.exports = router;
