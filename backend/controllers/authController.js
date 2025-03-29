const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const {
    name,
    email,
    password,
    confirmPassword,
    address,
    phoneNumber,
    isAdmin,
  } = req.body;
  try {
    if ((!name, !email, !password, !confirmPassword, !phoneNumber)) {
      res
        .status(400)
        .json({ message: "All fields are required.", success: false });
    }
    const user = await userModel.findOne({ email });

    if (user) {
      res
        .status(404)
        .json({ message: "User already registered. please login " });
    }
    if (password !== confirmPassword) {
      res
        .status(400)
        .json({ message: "Password didnot match with the confirm password." });
    }
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        const createdUser = await userModel.create({
          name,
          email,
          password: hash,
          confirmPassword: hash,
          address,
          phoneNumber,
          isAdmin,
        });

        res.status(201).json({
          message: "User registered successfully",
          success: true,
          user: createdUser,
        });
      });
    });
  } catch (err) {
    res.status(500).json({ message: `Server error ${err}` });
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "All fields are required.", success: false });
  }

  try {
    // Find the user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "Email or Password is invalid.", success: false });
    }

    // Generate JWT token
    const token = jwt.sign({ user }, process.env.JWT_SECRET_KEY, {
      expiresIn: "24hr",
    });

    // Set the token in a cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    // Respond with success and user data
    return res.status(200).json({
      message: "User logged in successfully",
      user,
      token,
      success: true,
    });
  } catch (error) {
    // Catch and handle any server errors
    return res
      .status(500)
      .json({ message: `Server error: ${error.message}`, success: false });
  }
};

const checkAuth = async (req, res) => {
  try {
    const { user } = req.user;
    console.log("user", user);
    const newUser = await userModel.findById(user._id).populate("wishList");

    res.status(200).json({
      message: "User Logged in",
      user: newUser,
      success: true,
      loggedIn: true,
    });
  } catch (err) {
    return res.status(403).json({ message: "Invalid token", loggedIn: false });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await userModel.find();

    if (allUsers) {
      res.status(200).json({ message: "Users available", allUsers });
    }
  } catch (error) {
    res.status(500).json({ message: `Server error ${error}` });
  }
};
const logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
  });

  // Send response
  res.status(200).json({ message: "Logout Successfully" });
};

module.exports = { register, login, getAllUsers, logout, checkAuth };
