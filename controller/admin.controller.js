const express = require('express');
const db = require("../db/db")
const router = express.Router();
const adminService = require('../services/admin.services');


// Get a admin
router.get("/", function getAll(req, res) {
    adminService.getAdmins(req, res).then((response) => {
        res.send(response);
    }).catch((err) => { res.send(err) });
});

// Add a new admin
router.post("/create", async function save(req, res) {
    adminService.createAdmin(req, res).then((response) => {
        res.send(response);
    }).catch((err) => { res.send(err) });
});

module.exports = router;
