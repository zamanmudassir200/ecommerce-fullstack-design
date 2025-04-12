const express = require("express");

const { authenticationToken } = require("../middlewares/authenticationToken");
const {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrdersByUser,
} = require("../controllers/orderController");

const router = express.Router();

router.post("/:cartId", authenticationToken, createOrder);
router.get("/", authenticationToken, getAllOrders);
// router.get("/:orderId", authenticationToken, getOrderById);
router.get("/getOrdersByUser", authenticationToken, getOrdersByUser);

module.exports = router;
