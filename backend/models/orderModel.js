const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    products: [
      {
        type: {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product",
          },
          quantity: Number,
          price: Number,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    shippingAddress: {
      type: {
        street: {
          type: String,
        },
        city: {
          type: String,
        },
        postalCode: {
          type: String,
        },
        country: {
          type: String,
        },
      },
      required: true,
    },
    payMethod: {
      type: String,
    },
    paymentStatus: {
      type: String,
      default: "Pending",
    },
    orderStatus: {
      type: String,
      default: "Processing",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("order", orderSchema);
