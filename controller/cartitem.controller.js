const express = require('express')

const router = express.Router()

const cartitemService = require('../services/cartitem.services');

router.post("/add", function save(req, res) {
    cartitemService.Cartitem(req, res).then((response) => {
        res.send(response)
    }).catch((err) => { res.send(err.message) })
});
router.get("/", function find(req, res) {
    cartitemService.findCartitem(req, res).then((response) => {
        res.send(response)
    }).catch((err) => { res.send(err.message) })
});
router.put("/", function update(req, res) {
    cartitemService.updateCartitem(req, res).then((response) => {
        res.send(response)
    }).catch((err) => { res.send(err.message) })
});
router.delete("/deletecartitem", function Delete(req, res) {
    cartitemService.DeleteCartitem(req, res).then((response) => {
        res.send(response)
    }).catch((err) => { res.send(err.message) })
});
router.delete("/deleteallcartitem", function Delete(req, res) {
    cartitemService.DeleteAllCartitem(req, res).then((response) => {
        res.send(response)                    
    }).catch((err) => { res.send(err.message) })
});



module.exports = router
