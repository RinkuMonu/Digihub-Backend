
const mongoose = require('mongoose');

const Schema = mongoose.Schema



const Orderitem = new Schema({
   product: {
      type: Schema.Types.ObjectId,
      ref: "products"
   },
   size: {
      type: String
   },
   color: {
      type: String
   },
   quantity: {
      type: Number
   },
   price: {
      type: Number
   },
   discount_price: {
      type: Number
   },
   user: {
      type: Schema.Types.ObjectId,
      ref: "users"
   }

})

module.exports = mongoose.model("orderitems", Orderitem)
