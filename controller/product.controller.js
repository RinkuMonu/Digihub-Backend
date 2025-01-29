const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const productService = require("../services/product.services");

// Add a product
router.post("/add", function save(req, res) {
  productService
    .Add(req, res)
    .then((response) => {
      res.send({ response });
    })
    .catch((err) => {
      res.send(err);
    });
});

// Rate a product
router.post("/reviews", function save(req, res) {
  productService
    .rateProduct(req, res)
    .then((response) => {
      res.send({ response });
    })
    .catch((err) => {
      res.send(err);
    });
});

// Get all products
router.get("/", async (req, res) => {
  console.log("GET /Products");
  try {
    const { color, size, minPrice, maxPrice, sortBy, sortOrder } = req.query;
    const filters = {};
    if (color) {
      filters.color = color;
    }
    if (size) {
      filters.size = size;
    }
    if (minPrice) {
      filters.minPrice = minPrice;
    }
    if (maxPrice) {
      filters.maxPrice = maxPrice;
    }

    const sort = {};
    if (sortBy) {
      sort.field = sortBy;
      sort.order = sortOrder === "desc" ? "desc" : "asc";
    }
    const response = await productService.Get(filters, sort);
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Get a single product by ID
router.get("/:id", async (req, res) => {
  console.log("GET /Product/:id");
  const { id } = req.params;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ error: "Invalid product ID format." });
  }
  try {
    const response = await productService.getOne(req, res);
    if (!response) {
      return res.status(404).send({ error: "Product not found." });
    }
    res.send(response);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Update a product by ID
router.put("/:id", (req, res) => {
  productService
    .updateProduct(req, res)
    .then((response) => {
      res.send({ response, message: "Product updated successfully" });
    })
    .catch((err) => {
      res.send({ err, message: "Error while updating the product" });
    });
});

// Delete a product by ID
router.delete("/:id", (req, res) => {
  productService
    .deleteProduct(req, res)
    .then((response) => {
      res.send({ response, message: "Product deleted successfully" });
    })
    .catch((err) => {
      res.send({ err, message: "Error while deleting product" });
    });
});

module.exports = router;
