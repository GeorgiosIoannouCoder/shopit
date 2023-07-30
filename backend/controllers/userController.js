import jwt from "jsonwebtoken";
import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";

// Route: POST /api/users/auth
// Access: Public
// Controller: authUser
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("jwt", jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 3600000, // 1 hr.
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password!");
  }
});

// Route: POST /api/users
// Access: Public
// Controller: registerUser
const registerUser = asyncHandler(async (req, res) => {
  res.send("register user");
});

// Route: POST /api/users/logout
// Access: Private
// Controller: logoutUser
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0), // Clear/Delete the cookie.
  });
  res.status(200).json({ message: "Logged out successfully!" });
});

// Route: GET /api/users/profile
// Access: Private
// Controller: getUserProfile
const getUserProfile = asyncHandler(async (req, res) => {
  res.send("get user profile");
});

// Route: PUT /api/users/profile
// Access: Private
// Controller: updateUserProfile
const updateUserProfile = asyncHandler(async (req, res) => {
  res.send("update user profile");
});

// Route: GET /api/users
// Access: Private
// Controller: getUsers
const getUsers = asyncHandler(async (req, res) => {
  res.send("get users");
});

// Route: DELETE /api/users/:id
// Access: Private
// Controller: deleteUser
const deleteUser = asyncHandler(async (req, res) => {
  res.send("delete user");
});

// Route: GET /api/users/:id
// Access: Private
// Controller: getUserById
const getUserById = asyncHandler(async (req, res) => {
  res.send("get user by id");
});

// Route: PUT /api/users/:id
// Access: Private
// Controller: updateUser
const updateUser = asyncHandler(async (req, res) => {
  res.send("update user");
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
