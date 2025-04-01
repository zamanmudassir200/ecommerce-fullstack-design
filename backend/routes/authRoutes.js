const express = require("express");
const {
  login,
  register,
  getAllUsers,
  logout,
  checkAuth,
  editUser,
  upload,
} = require("../controllers/authController");
const { authenticationToken } = require("../middlewares/authenticationToken");
const router = express.Router();

router.post("/", register);
router.post("/login", login);
router.post("/logout", authenticationToken, logout);
router.get("/", getAllUsers);
router.get("/checkAuth", authenticationToken, checkAuth);
router.patch(
  "/editUser",
  authenticationToken,
  upload.single("profilePic"),
  editUser
);
module.exports = router;
