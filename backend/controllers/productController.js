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

// Route: POST /api/products
// Access: Private
// Controller: createProduct
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample Product",
    price: 0,
    user: req.user._id,
    image: "/image/sample.png",
    brand: "Sample Brand",
    category: "Sample Category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample Description",
  });

  const createdProduct = await product.save();

  res.status(200).json(createdProduct);
});

// Route: PUT /api/products/:id
// Access: Private
// Controller: updateProduct
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();

    res.status(200).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found!");
  }
});

export { getProducts, getProductById, createProduct, updateProduct };
