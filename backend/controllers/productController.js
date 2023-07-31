import Product from "../models/productModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

// Route: GET /api/products
// Access: Public
// Controller: getProducts
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.status(200).json(products);
});

// Route: GET /api/products/:id
// Access: Public
// Controller: getProductById
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    return res.status(200).json(product);
  }
  res.status(404);
  throw new Error("Product not found!");
});

export { getProducts, getProductById };
