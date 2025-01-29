const express = require('express')
const db = require("../db/db")


const router = express.Router()

const Address = db.Address


router.post("/newaddress", async function save(req, res) {

    try {
        const address = new Address(req.body);
        await address.save();
        res.status(201).send(address);
    } catch (error) {
        res.status(400).send(error);
    }

});

router.get('/', async (req, res) => {
    try {
        const addresses = await Address.find();
        res.status(200).send(addresses);
    } catch (error) {
        res.status(500).send(error); 
    }
});



// Get address by ID
router.get('/:id', async (req, res) => {
    try {
        const address = await Address.findById(req.params.id);
        if (!address) {
            return res.status(404).send();
        }
        res.status(200).send(address);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update address by ID
router.patch('/:id', async (req, res) => {
    try {
        const address = await Address.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!address) { 
            return res.status(404).send();
        }
        res.status(200).send(address);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete address by ID
router.delete('/api/addresses/:id', async (req, res) => {
    try {
        const address = await Address.findByIdAndDelete(req.params.id);
        if (!address) {
            return res.status(404).send();
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router
