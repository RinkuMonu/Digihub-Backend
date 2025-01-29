const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
require("dotenv").config();
require("./db/db.js");
// const JWtAuth = require("./middleware/jwt.middleware.js");
const AdminAuth = require("./middleware/admin.middleware.js");

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => { res.send("Hello World!") });

app.use("/user", require("./controller/user.controller"));
app.use("/product", require("./controller/product.controller.js"));
app.use("/cart",  require("./controller/cart.controller.js"));
app.use("/address", require("./controller/address.controller.js"));
app.use("/category", require("./controller/category.controller.js"));
app.use("/cartitem", require("./controller/cartitem.controller.js"));
app.use("/payment", require("./controller/payment.controller.js"));
app.use("/orderitem", require("./controller/orderitem.controller.js"));
app.use("/order",  require("./controller/order.controller.js"));
app.use("/wishlist", require("./controller/wishlist.controller.js"));
app.use("/shipping",  require("./controller/shipping.controller.js"));

//routes for admin panel APIs
console.log("error 12")
app.use("/admin", require("./controller/admin.controller.js"));
app.use("/admin/category", require("./controller/category.controller.js"));
// app.use("/admin/content",require("./controller/content.controller.js"));
app.use("/admin/discount", require("./controller/discount.controller.js"));
app.use("/admin/inventory", require("./controller/inventory.controller.js"));
app.use("/admin/order", require("./controller/order.controller.js"));
app.use("/admin/payment", require("./controller/payment.controller.js"));
app.use("/admin/product", require("./controller/product.controller.js"));
console.log("error 20")
app.use("/admin/report", require("./controller/report.controller.js"));
app.use("/admin/shipping", require("./controller/shipping.controller.js"));
app.use("/admin/user", require("./controller/user.controller.js"));

// Start the server 
app.listen(process.env.PORT, () => {
  console.log(`App is listening at port ${process.env.PORT}`);
});
