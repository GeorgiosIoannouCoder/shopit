import express from "express";
const router = express.Router();

import {
  getProducts,
  getProductById,
} from "../controllers/productController.js";

// Method: GET
// Controller: getProducts.
// Middlewares:
router.route("/").get(getProducts);

// Dynamic Route with id.
// Method: GET
// Controller: getProductById.
// Middlewares:
router.route("/:id").get(getProductById);

export default router;
