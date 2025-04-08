const express = require("express");

const { authenticationToken } = require("../middlewares/authenticationToken");
const { createOrder } = require("../controllers/orderController");

const router = express.Router();

router.post("/", authenticationToken, createOrder);
module.exports = router;
