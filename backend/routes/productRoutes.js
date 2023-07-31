import express from "express";
const router = express.Router();

import { protect, admin } from "../middleware/authMiddleware.js";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
} from "../controllers/productController.js";

// Methods: GET, POST
// Controllers: getProducts, createProduct
// Middlewares: protect, admin
router.route("/").get(getProducts).post(protect, admin, createProduct);

// Dynamic Route with id.
// Methods: GET, PUT
// Controller: getProductById, updateProduct
// Middlewares: protect, admin
router.route("/:id").get(getProductById).put(protect, admin, updateProduct);

export default router;
