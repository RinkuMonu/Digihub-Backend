const express = require("express");

const db = require("../db/db");

const router = express.Router();

const dbOrderitem = db.Orderitem;


router.post("/add", async (req, res) => {
    try {
      const { product } = req.body;
      const orderItems = await dbOrderitem.insertMany(product);
      res.status(201).send(orderItems);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });
  
  // ...............Get All Order Items...................
  router.get("/", async (req, res) => {
    try {
      const orderItems = await dbOrderitem.find()
        .populate("product")
        .populate("user");
      res.status(200).send(orderItems);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });
  
  // ...............Get Order Item by ID...................
  router.get("/:id", async (req, res) => {
    try {
      const orderItem = await dbOrderitem.findById(req.params.id)
        .populate("product")
        .populate("user");
      if (!orderItem) return res.status(404).json({ message: "Order item not found" });
      res.status(200).json(orderItem);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch order item", error });
    }
  });
  
  // ...............Update Order Item...................
  router.put("/:id", async (req, res) => {
    try {
      const updatedOrderItem = await dbOrderitem.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!updatedOrderItem) return res.status(404).json({ message: "Order item not found" });
      res.status(200).json(updatedOrderItem);
    } catch (error) {
      res.status(500).json({ message: "Failed to update order item", error });
    }
  });
  
  // ...............Delete Order Item...................
  router.delete("/:id", async (req, res) => {
    try {
      const deletedOrderItem = await dbOrderitem.findByIdAndDelete(req.params.id);
      if (!deletedOrderItem) return res.status(404).json({ message: "Order item not found" });
      res.status(200).json(deletedOrderItem);
    } catch (error) {
      res.status(500).json({ message: "Failed to delete order item", error });
    }
  });
  

module.exports = router;
