const mongoose = require('mongoose');

const Schema = mongoose.Schema

const Cart = new Schema({
    userID : {
        type:Schema.Types.ObjectId,
        ref:"users"
    },
    cartitem:{
        type:Schema.Types.ObjectId,
        ref:"cartitems"
    }
})


module.exports = mongoose.model("carts",Cart)
