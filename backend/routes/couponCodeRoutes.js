const express = require("express");
const {
  addCouponCode,
  applyCouponCode,
} = require("../controllers/couponCodeController");
const { authenticationToken } = require("../middlewares/authenticationToken");
const router = express.Router();

router.post("/", authenticationToken, addCouponCode);
router.post("/apply-coupon", authenticationToken, applyCouponCode);
module.exports = router;
