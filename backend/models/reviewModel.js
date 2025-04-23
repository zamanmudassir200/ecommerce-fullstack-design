const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
    rating: {
      type: Number,
      required: true,
      default: 1,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("review", reviewSchema);
