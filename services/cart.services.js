const db = require("../db/db")
const dbCart = db.Cart

async function Cart(req, res) {
    let newCart ={
        userID:req.userId,
        cartitem:req.body.cartitem
    }
    const result = await new dbCart(newCart).save();
    const data = {
       responseCode: 1
    }
    return (data)   
   
}
async function findCart(req, res) {
    const result = await dbCart.findOne({userID : req.userId}).populate("userID").populate("cartitem");
    const data ={
        result:result,
        responseCode:1
    }
    return (data)
}

async function updateCart(req, res) {
    let result = await dbCart.findOneAndUpdate({ userID: req.userId}, req.body)
    const data = {
       result: result,
       responseCode: 1
    }
    return (data)
 
 }

module.exports={
    Cart,
    findCart,
    updateCart
    
}



