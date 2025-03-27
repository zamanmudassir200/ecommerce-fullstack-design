const express = require("express");
const {
  addToCart,
  getCartsByUser,
  removeFromCart,
  removeAllProductsFromCart,
} = require("../controllers/cartController");
const { authenticationToken } = require("../middlewares/authenticationToken");
const router = express.Router();

router.post("/:productId", authenticationToken, addToCart);

router.get("/", authenticationToken, getCartsByUser);
router.patch("/:productId", authenticationToken, removeFromCart);
router.delete("/delete-all", authenticationToken, removeAllProductsFromCart);
module.exports = router;
