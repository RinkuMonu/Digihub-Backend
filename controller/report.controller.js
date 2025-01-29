const express = require('express');
const router = express.Router();
const reportService = require('../services/report.services');

// Generate sales report
router.get("/sales", async (req, res) => {
    try {
        const response = await reportService.getSalesReport(req, res);
        res.send(response);
    } catch (err) {
        res.status(500).send({ responseCode: 0, message: err.message });
    }
});

module.exports = router;
