const express = require("express");

const router = express.Router();

const db = require("../db/db");

const Order = db.Order;

// ...............new order...................

router.post("/add", async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).send({ message: "Order created successfully", order });
  } catch (error) {
    res.send(error);
  }
});

// ...............Get all orders...................

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user")
      .populate("orderitem")
      .populate("shippingAddress");
    res.status(200).send(orders); 
  } catch (error) {
    res.status(500).send({ message: "Failed to fetch orders", error });
  }
});

// ...............Get Order by ID...................
router.get("/:id", async (req, res) => {
    try {
      const order = await Order.findById(req.params.id)
        .populate("user")
        .populate("orderitem")
        .populate("shippingAddress");
      if (!order) return res.status(404).json({ message: "Order not found" });
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch order", error });
    }
  });
//....................order history................

router.post("/history", async (req, res) => {
    try {
        const { user, page, limit = 5 } = req.body;
        const skip = (page - 1) * limit;
        const result = await Order.find({ user })
            .skip(skip)
            .limit(parseInt(limit))
            .populate("user")
            .populate("shippingAddress")
            .populate({
                path: 'orderitem',
                populate: [{ path: 'product' }]
            });
        const totalCount = await Order.countDocuments({ user });
        const data = {
            result,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(totalCount / limit),
                totalItems: totalCount
            },
            responseCode: 1
        };
        res.send(data);
    } catch (error) {
      console.log(error)
      res.status(500).send({
        error: error.message,
        responseCode: 0,
      });
    }
  });     

  // Update an order
  router.put('/:id', async (req, res) => {
    try {
      const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!order) {
        return res.status(404).send();
      }
      res.send(order);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  
  // Delete an order
  router.delete('/:id', async (req, res) => {
    try {
      const order = await Order.findByIdAndDelete(req.params.id);
      if (!order) {
        return res.status(404).send();
      }
      res.send(order);
    } catch (error) {
      res.status(500).send(error);
    }
  });



module.exports = router
