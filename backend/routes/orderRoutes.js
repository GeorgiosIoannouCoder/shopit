import express from "express";
const router = express.Router();

import { protect, admin } from "../middleware/authMiddleware.js";
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
} from "../controllers/orderController.js";

// Methods: POST, GET
// Controllers: addOrderItems, getOrders
// Middlewares: protect, admin
router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);

// Method: GET
// Controller: getMyOrders
// Middleware: protect
router.route("/mine").get(protect, getMyOrders);

// Dynamic Route with id.
// Method: GET
// Controller: getOrderById
// Middlewares: protect
router.route("/:id").get(protect, admin, getOrderById);

// Dynamic Route with id.
// Method: PUT
// Controller: updateOrderToPaid
// Middleware: protect
router.route("/:id/pay").put(protect, updateOrderToPaid);

// Dynamic Route with id.
// Method: PUT
// Controller: updateOrderToDelivered
// Middlewares: protect, admin
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);

export default router;
