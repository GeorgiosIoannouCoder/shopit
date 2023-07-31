import express from "express";
const router = express.Router();
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from "../controllers/userController.js";

// Methods: POST, GET
// Controllers: registerUser, getUsers
// Middlewares: protect, admin
router.route("/").post(registerUser).get(protect, admin, getUsers);

// Method: POST
// Controller: logoutUser.
// Middlewares:
router.post("/logout", logoutUser);

// Method: POST
// Controller: authUser.
// Middlewares:
router.post("/auth", authUser);

// Methods: GET, PUT
// Controllers: getUserProfile, updateUserProfile
// Middleware: protect
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

// Dynamic Route with id.
// Methods: DELETE, GET, PUT
// Controllers: deleteUser, getUserById, updateUser
// Middlewares:
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

export default router;
