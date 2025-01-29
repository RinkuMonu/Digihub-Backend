const mongoose = require('mongoose');

const Schema = mongoose.Schema

const cartitem = new Schema({
    cart:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'carts'
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'products' 
    },
    size:{
        type:String
    },
    quantity:{
        type:Number,
        default:1
    },
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users' 
    },
    color:{
        type:String
    }
});


module.exports = mongoose.model("cartitems",cartitem);

