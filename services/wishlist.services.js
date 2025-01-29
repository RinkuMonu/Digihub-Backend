const Wishlist = require("../models/wishlist.model");

async function AddToWishlist(req, res){
    const { productId, userId } = req.body;
    const existingItem = await Wishlist.findOne({ userId, productId });
    if(existingItem){
        const message = "Product already in wishlist";
        return message;
    }
    const newItem = new Wishlist({ userId, productId });
    await newItem.save();
    const data = {
        message: 'Product added to wishlist',
        newItem : newItem
    }
    return data;
}

async function GetWishlist(req,res){
    const {userId} = req.body;
    const wishlistItems = await Wishlist.find({ userId }).populate('productId');
    if(!wishlistItems){
        const mssg = "No products found";
        return mssg;
    }
    return wishlistItems;
}

async function RemoveFromWishlist(req, res){
    const {userId, productId} = req.body;
    const removedItem = await Wishlist.findOneAndDelete({ userId, productId });
    if (!removedItem) {
        const mssg = 'Product not found in wishlist'
      return mssg;
    }

    return removedItem;
}

module.exports = {
    AddToWishlist,
    GetWishlist,
    RemoveFromWishlist
}