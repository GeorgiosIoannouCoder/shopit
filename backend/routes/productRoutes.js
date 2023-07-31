import express from "express";
const router = express.Router();

import { protect, admin } from "../middleware/authMiddleware.js";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
} from "../controllers/productController.js";

// Methods: GET, POST
// Controllers: getProducts, createProduct
// Middlewares: protect, admin
router.route("/").get(getProducts).post(protect, admin, createProduct);

// Methods: GET
// Controller: getTopProducts
// Middlewares:
router.get("/top", getTopProducts);

// Dynamic Route with id.
// Methods: GET, PUT
// Controller: getProductById, updateProduct, deleteProduct
// Middlewares: protect, admin
router
  .route("/:id")
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

// Dynamic Route with id.
// Method: POST
// Controller:createProductReview
// Middleware: protect
router.route("/:id/reviews").post(protect, createProductReview);

export default router;
