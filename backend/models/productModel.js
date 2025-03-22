// const mongoose = require("mongoose");

// const productSchema = mongoose.Schema(
//   {
//     productName: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     description: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     price: {
//       type: Number,
//       required: true,
//     },
//     discount: {
//       type: Number,
//       default: 0, // Consider a default if applicable
//       max: 100,
//     },
//     category: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "category", // Reference to the category model
//     },
//     brand: {
//       type: String,
//       required: true,
//     },
//     stock: {
//       type: Number,
//       required: true,
//       min: 0, // Ensure stock can't be negative
//     },
//     images: {
//       type: [String], // Array of image URLs as strings
//       required: true,
//     },
//     rating: {
//       type: Number,
//       default: 0,
//       min: 0,
//       max: 5, // Assuming ratings are on a 0-5 scale
//     },
//     reviews: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "review",
//       },
//     ],
//   },
//   {
//     timestamps: true,
//   }
// );

// module.exports = mongoose.model("product", productSchema);
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
    ref: "category", // Reference to the subcategory
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
