const express = require("express");

const router = express.Router();

const WishlistService = require('../services/wishlist.services');

router.post("/", function save(req, res) {                                                
  WishlistService.AddToWishlist(req, res)
    .then((response) => {
      res.send({ response });
    })
    .catch((err) => {
      res.send(err);
    });
});

router.get("/", (req, res) => {
    WishlistService.GetWishlist(req, res)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.delete("/", (req, res) => {
    WishlistService.RemoveFromWishlist(req, res)
    .then((response) => {
      res.send({ message: "Product Removed from wishlist successfully" });
    })
    .catch((err) => {
      res.send({ message: "error while removing product from wishlist" });
    });
});

module.exports = router;