import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateJWT from "../utils/generateJWT.js";

// Route: POST /api/users/auth
// Access: Public
// Controller: authUser
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateJWT(res, user._id);

    res.status(200).json({
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
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists!");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateJWT(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data!");
  }
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
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

// Route: PUT /api/users/profile
// Access: Private
// Controller: updateUserProfile
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

// Route: GET /api/users
// Access: Private
// Controller: getUsers
const getUsers = asyncHandler(async (req, res) => {
  // const users = await User.find({});
  // res.status(200).json(users);

  const pageSize = 8;

  const page = Number(req.query.pageNumber) || 1;

  const count = await User.countDocuments();

  const users = await User.find({})
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.status(200).json({ users, page, pages: Math.ceil(count / pageSize) });
});

// Route: DELETE /api/users/:id
// Access: Private
// Controller: deleteUser
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("Cannot delete admin user!");
    }
    await User.deleteOne({ _id: user._id });
    res.status(200).json({ message: "User removed successfuly!" });
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

// Route: GET /api/users/:id
// Access: Private
// Controller: getUserById
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

// Route: PUT /api/users/:id
// Access: Private
// Controller: updateUser
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;

    user.email = req.body.email || user.email;

    user.isAdmin = Boolean(req.body.isAdmin);

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
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
