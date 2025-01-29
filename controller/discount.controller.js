const express = require('express');
const router = express.Router();
const discountService = require('../services/discount.services');

// Create a new discount/coupon
router.post("/create", function save(req, res) {
    discountService.createDiscount(req, res).then((response) => {
        res.send(response);
    }).catch((err) => { res.send(err) });
});

// Get all discounts/coupons
router.get("/all", function getAll(req, res) {
    discountService.getAllDiscounts(req, res).then((response) => {
        res.send(response);
    }).catch((err) => { res.send(err) });
});

module.exports = router;
