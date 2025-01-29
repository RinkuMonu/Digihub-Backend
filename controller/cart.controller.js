const express = require('express');
const router = express.Router();
const cartService = require('../services/cart.services');
// const { generateToken } = require('../utils/tokenGenerator');  

// Create a new cart (add product to cart)
router.post("/newcart", function save(req, res) {
    // Generate a unique cart token for this action
    const cartToken = generateToken();  // Using the token generator utility

    cartService.Cart(req, res, cartToken).then((response) => {
        res.status(200).send(response);  // Sending success response with the token
    }).catch((err) => {
        res.status(500).send(err);  // Handling errors
    });
});

// Get cart details
router.get("/", function find(req, res) {
    cartService.findCart(req, res).then((response) => {
        res.status(200).send(response);
    }).catch((err) => {
        res.status(500).send(err);
    });
});

// Update cart details
router.put("/", function update(req, res) {
    cartService.updateCart(req, res).then((response) => {
        res.status(200).send(response);
    }).catch((err) => {
        res.status(500).send(err);
    });
});

module.exports = router;
