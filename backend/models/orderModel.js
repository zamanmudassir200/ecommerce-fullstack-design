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
          products: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product",
          },
          quantity: {
            type: Number,
          },
          price: {
            type: Number,
          },
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
    paymentMethod: {
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
    timeStamps: true,
  }
);
export const orderModel = mongoose.model("order", orderSchema);
