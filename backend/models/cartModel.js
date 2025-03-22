const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    items: [
      {
        type: {
          products: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product",
          },
          quantity: Number,
        },
      },
    ],
    totalPrice: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);
export const cartModel = mongoose.model("cart", cartSchema);
