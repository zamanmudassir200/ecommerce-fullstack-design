const express = require("express");
const {
  login,
  register,
  getAllUsers,
  logout,
  checkAuth,
} = require("../controllers/authController");
const { authenticationToken } = require("../middlewares/authenticationToken");
const router = express.Router();

router.post("/", register);
router.post("/login", login);
router.post("/logout", authenticationToken, logout);
router.get("/", getAllUsers);
router.get("/checkAuth", authenticationToken, checkAuth);
module.exports = router;
