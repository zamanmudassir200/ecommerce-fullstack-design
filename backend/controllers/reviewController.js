const productModel = require("../models/productModel");
const reviewModel = require("../models/reviewModel");
const userModel = require("../models/userModel");

const addReview = async (req, res) => {
  try {
    const { id } = req.user;
    const { productId } = req.params;
    const existingUser = await userModel.findById(id);
    if (!existingUser) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    const { user, product, rating, comment } = req.body;
    if (!rating || !comment) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    let existingProduct = await productModel.findById(productId);
    if (!existingProduct) {
      return res
        .status(404)
        .json({ message: "Product not found", success: false });
    }

    const review = await reviewModel.create({
      user: existingUser._id,
      product: existingProduct._id,
      rating,
      comment,
    });

    await review.populate("user");
    await review.save();
    existingProduct = await productModel.findByIdAndUpdate(
      productId,
      { $addToSet: { reviews: review._id } },
      { new: true }
    );
    console.log("existingproduct reviews check", existingProduct);
    console.log("user", id);
    console.log("productId", productId);
    return res
      .status(201)
      .json({ message: "Review Submitted", review, success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Server error ${error}`, success: false });
  }
};

const getAllReviews = async (req, res) => {
  try {
    const reviews = await reviewModel
      .find()
      .populate("user", "name email") // Only fetch name & email of user
      .populate("product", "name price"); // Only fetch name & price of product

    return res.status(200).json({
      message: "All reviews fetched successfully",
      reviews,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Server error: ${error.message}`,
      success: false,
    });
  }
};

module.exports = { addReview, getAllReviews };
