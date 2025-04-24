const express = require("express");

const { authenticationToken } = require("../middlewares/authenticationToken");
const {
  createOrder,
  getAllOrders,
  getOrderById,
  approveOrder,
  getOrdersByUser,
  cancelOrder,
  changeOrderStatus,
} = require("../controllers/orderController");

const router = express.Router();

router.post("/:cartId", authenticationToken, createOrder);
router.get("/", authenticationToken, getAllOrders);
router.get("/:orderId", authenticationToken, getOrderById);
router.get("/user/getOrdersByUser", authenticationToken, getOrdersByUser);
router.patch("/approve-order/:orderId", authenticationToken, approveOrder);
router.post(
  "/change-order-status/:orderId",
  authenticationToken,
  changeOrderStatus
);
router.post("/cancel-order/:orderId", authenticationToken, cancelOrder);
module.exports = router;
