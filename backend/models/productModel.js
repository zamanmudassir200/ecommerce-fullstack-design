const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
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
    default: 0,
    max: 100,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category", // Reference to the category
  },
  subCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
  },
  brand: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  images: {
    type: [String],
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "review",
    },
  ],
});
module.exports = mongoose.model("product", productSchema);
