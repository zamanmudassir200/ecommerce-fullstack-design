const cartModel = require("../models/cartModel");
const couponCodeModel = require("../models/couponCodeModel");

const addCouponCode = async (req, res) => {
  try {
    const { couponCode, discount } = req.body;

    if (!couponCode || !discount) {
      return res
        .status(404)
        .json({ message: "Both fields are required.", success: false });
    }

    const createdCouponCode = await couponCodeModel.create({
      couponCode,
      discount,
    });

    return res.status(200).json({
      message: "Coupon code added successfully",
      couponCode: createdCouponCode,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
const applyCouponCode = async (req, res) => {
  try {
    const userId = req.user.user._id;
    const { couponCode } = req.body;

    const existingCouponCode = await couponCodeModel.findOne({ couponCode });
    if (!existingCouponCode) {
      return res
        .status(404)
        .json({ message: "Invalid Coupon", success: false });
    }

    const cart = await cartModel.findOne({ user: userId });
    if (!cart) {
      return res
        .status(404)
        .json({ message: "No Cart founds", success: false });
    }
    if (cart.couponApplied) {
      return res.status(200).json({ message: "Token expired", success: false });
    } else {
      const finalPrice =
        cart.totalPrice - (cart.totalPrice * existingCouponCode.discount) / 100;
      const newCart = await cartModel.findByIdAndUpdate(
        cart._id,
        {
          totalPrice: finalPrice,
          couponApplied: true,
        },
        { new: true }
      );
      return res.status(200).json({
        message: "Coupon applied successfully",
        success: true,
        cart: newCart,
        couponCode: existingCouponCode,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
module.exports = { addCouponCode, applyCouponCode };
