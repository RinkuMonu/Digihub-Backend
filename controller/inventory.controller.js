const express = require('express');
const router = express.Router();
const inventoryService = require('../services/inventory.services');

// Get all inventory records
router.get("/all", function getAll(req, res) {
    inventoryService.getAllInventory(req, res).then((response) => {
        res.send(response);
    }).catch((err) => { res.send(err) });
});

// Update inventory
router.put("/update", function update(req, res) {
    inventoryService.updateInventory(req, res).then((response) => {
        res.send(response);
    }).catch((err) => { res.send(err) });
});

module.exports = router;
    