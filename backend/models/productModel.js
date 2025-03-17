const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
    },
    category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
      },
    ],
    brand: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    images: {
      type: Array,
      required: true,
    },
    rating: {
      type: Number,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "review",
      },
    ],
  },
  {
    timeStamps: true,
  }
);
module.exports = mongoose.model("product", productSchema);
