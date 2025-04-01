const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
    },
    couponApplied: { type: Boolean, default: false }, // Add this field to track if a coupon is applied
  },
  {
    timestamps: true,
  }
);

const cartModel = mongoose.model("cart", cartSchema);
module.exports = cartModel;
