
const mongoose = require('mongoose');

const Schema = mongoose.Schema



const Order = new Schema({
    user : {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    orderitem:[{
        type: Schema.Types.ObjectId,
        ref: "orderitems"
    }],
    orderDate:{
        type:Date,
        default: Date.now()
    },
    deliveryDate:{
        type:Date
    },
    shippingAddress:{
        type: Schema.Types.ObjectId,
        ref: "addresses"
    },
    paymentStatus:{
        type:String,      
        default:"PENDING"
    },
    totalprice:{
        type:Number
    },
    discountprice:{
        type:Number
    },
    orderStatus:{
        type:String,
        default:"Pending"
    },
    totalitem:{
        type:Number
    }
})

module.exports = mongoose.model("orders", Order)
