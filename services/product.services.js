const db = require("../db/db");
const dbProduct = db.Product;
const dbReview = db.Review;

async function Add(req, res) {
  let newProduct = {
    title: req.body.title,
    category: req.body.category,
    brand: req.body.brand,
    color: req.body.color,
    size: req.body.size,
    quantity: req.body.quantity,
    price: req.body.price,
    discount: req.body.discount,
    discount_price: req.body.discount_price,
    description: req.body.description,
    image: req.body.image,
  };
  const result = await new dbProduct(newProduct).save();
  const data = {
    responseCode: 1,
    result: result,
  };
  return data;
}

async function Get(filters = {}, sort = {}) {
  try {
    const query = {};
    if (filters.color) {
      query.color = filters.color;
    }
    if (filters.size) {
      query.size = filters.size;
    }
    if (filters.minPrice) {
      query.price = { ...query.price, $gte: parseFloat(filters.minPrice) };
    }
    if (filters.maxPrice) {
      query.price = { ...query.price, $lte: parseFloat(filters.maxPrice) };
    }
    const sortOptions = {};
    if (sort.field) {
      sortOptions[sort.field] = sort.order === "desc" ? -1 : 1;
    } else {
      sortOptions["createdAt"] = -1; // Default sort
    }
    const allProducts = await dbProduct
      .find(query)
      .sort(sortOptions)
      .populate("reviews", null, null, { strictPopulate: false })
      .populate("category");
    return allProducts;
  } catch (err) {
    throw new Error("Error fetching products: " + err.message);
  }
}

async function getOne(req, res) {
  try {
    const productinfo = await dbProduct
      .findById(req.params.id)
      .populate("userId")
      .populate("category")
      .populate("review");

    if (!productinfo) {
      const message = "Product not found";
      return message;
    }
    return productinfo;
  } catch (err) {
    throw new Error("Error fetching products: " + err.message);
  }
}

async function deleteProduct(req, res) {
  const id = req.params.id;
  const product = await dbProduct.findByIdAndDelete(id);
  if (!product) {
    const mess = "Product not found";
    return mess;
  }
  return product;
}

async function updateProduct(req, res) {
  const id = req.params.id;
  const product = await dbProduct.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  return product;
}

async function rateProduct(req, res) {
  try {
    const product = req.body.productId;
    const user = req.userId;
    const rating = req.body.rating;
    const comment = req.body.comment;

    // Find the product
    const productToUpdate = await dbProduct.findById(product);
    console.log(productToUpdate);
    if (!productToUpdate) {
      throw new Error("Product not found");
    }

    // Check if a review by this user already exists for the product
    let userReview = await dbReview.findOne({ product, user });

    if (userReview) {
      // Update existing review
      userReview.rating = rating;
      userReview.comment = comment;
      await userReview.save();
      productToUpdate.review.push(userReview._id);
      await productToUpdate.save();
      console.log("productToUpdate is", productToUpdate);
    } else {
      // Create a new review
      userReview = new dbReview({
        product,
        user,
        rating,
        comment,
      });
      await userReview.save();

      // Add the new review's ID to the product's review field
      productToUpdate.review.push(userReview._id);
      await productToUpdate.save();
      console.log("productToUpdate is", productToUpdate);
    }

    // Send success response
    return { message: "Rating has been added or updated successfully." };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong. Please try again later." };
  }
}

module.exports = {
  Add,
  Get,
  getOne,
  deleteProduct,
  updateProduct,
  rateProduct,
};
