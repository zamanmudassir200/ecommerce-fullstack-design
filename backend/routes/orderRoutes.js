const express = require("express");

const { authenticationToken } = require("../middlewares/authenticationToken");
const {
  createOrder,
  getAllOrders,
  getOrderById,
  approveOrder,
  getOrdersByUser,
} = require("../controllers/orderController");

const router = express.Router();

router.post("/:cartId", authenticationToken, createOrder);
router.get("/", authenticationToken, getAllOrders);
// router.get("/:orderId", authenticationToken, getOrderById);
router.get("/getOrdersByUser", authenticationToken, getOrdersByUser);
router.patch("/approve-order/:orderId", authenticationToken, approveOrder);
module.exports = router;
