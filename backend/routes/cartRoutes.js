const express = require("express");
const {
  addToCart,
  getCartsByUser,
  removeFromCart,
} = require("../controllers/cartController");
const { authenticationToken } = require("../middlewares/authenticationToken");
const router = express.Router();

router.post("/:productId", authenticationToken, addToCart);

router.get("/", authenticationToken, getCartsByUser);
router.patch("/:productId", authenticationToken, removeFromCart);

module.exports = router;
