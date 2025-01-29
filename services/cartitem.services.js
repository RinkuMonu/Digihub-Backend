const db = require("../db/db");
const dbCartitem = db.Cartitem;

async function Cartitem(req, res) {
  try {
    const existdata = await dbCartitem.findOne({
      userID: req.userId,
      product: req.body.product,
      size: req.body.size,
    });

    if (existdata == null || existdata == undefined) {
      const result = await new dbCartitem(req.body).save();
      const data = {
        result: result,
        response: 1,
      };
      return data;
    }
    if (existdata != null) {
      let updateitem = {
        userID: req.userId,
        product: req.body.product,
        cart: req.body.cart,
        size: req.body.size,
        quantity: existdata.quantity + req.body.quantity,
        color: req.body.color,
      };
      const result = await dbCartitem.findOneAndUpdate(
        {
          userID: req.userId,
          product: req.body.product,
          size: req.body.size,
        },
        updateitem,
        { new: true }
      );
      const data = {
        result: result,
        response: 2,
      };
      return data;
    }
  } catch (error) {
    const data = {
      error: error.message,
      response: 0,
    };
    return data;
  }
}
async function findCartitem(req, res) {
  const result = await dbCartitem
    .find({ userID: req.userId })
    .populate("product");
  const data = {
    result: result,
    responseCode: 1,
  };
  return data;
}
async function updateCartitem(req, res) {
  const result = await dbCartitem.findOneAndUpdate(
    { userID: req.userId, product: req.body.product, size: req.body.size },
    req.body,
    { new: true }
  );
  const data = {
    result: result,
    responseCode: 1,
  };
  return data;
}
async function DeleteCartitem(req, res) {
  const result = await dbCartitem.findOneAndDelete({
    userID: req.userId,
    product: req.body.product,
    size: req.body.size,
  });
  const data = {
    responseCode: 1,
  };
  return data;
}
async function DeleteAllCartitem(req, res) {
  const result = await dbCartitem.deleteMany({ userID: req.userId });
  const data = {
    responseCode: 1,
    result,
  };
  return data;
}

module.exports = {
  Cartitem,
  findCartitem,
  updateCartitem,
  DeleteCartitem,
  DeleteAllCartitem,
};
