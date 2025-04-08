const express = require("express");

const { authenticationToken } = require("../middlewares/authenticationToken");
const { createOrder, getAllOrders } = require("../controllers/orderController");

const router = express.Router();

router.post("/:cartId", authenticationToken, createOrder);
router.get("/", authenticationToken, getAllOrders);
module.exports = router;
