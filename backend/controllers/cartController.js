const productModel = require("../models/productModel");
const cartModel = require("../models/cartModel");

const addToCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.user._id; // Assuming user is added to req in a middleware
    const { quantity } = req.body;

    // Fetch the product by ID
    const product = await productModel.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found", success: false });
    }

    // Find the user's cart or create a new one
    let cart = await cartModel.findOne({ user: userId });

    const productPrice = product.price * quantity;

    // If the cart exists, update it, otherwise create a new cart
    if (cart) {
      const productIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );

      if (productIndex > -1) {
        // Product exists in cart, increase its quantity
        cart.items[productIndex].quantity += quantity;
      } else {
        // Product doesn't exist, add it to the cart
        cart.items.push({ product: productId, quantity });
      }

      // Update the total price
      cart.totalPrice += productPrice;
    } else {
      // Create a new cart for the user
      cart = new cartModel({
        user: userId,
        items: [{ product: productId, quantity }],
        totalPrice: productPrice,
      });
    }

    // Save the updated or new cart
    await cart.populate("items.product");

    await cart.save();

    res
      .status(201)
      .json({ message: "Product added to cart", cart, success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Server error: ${error.message}`, success: false });
  }
};

// const getAllCarts = async (req, res) => {
//   try {
//     // Find all carts
//     let carts = await cartModel.find();

//     if (carts && carts.length > 0) {
//       // Populate the 'product' field in 'items' for each cart
//       carts = await Promise.all(
//         carts.map(async (cart) => {
//           await cart.populate("items.product"); // Populate the product field inside items array
//           return cart;
//         })
//       );

//       res.status(200).json({
//         message: "All carts",
//         count: carts.length,
//         carts,
//         success: true,
//       });
//     } else {
//       res.status(200).json({ message: "No carts found", success: true });
//     }
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: `Server error: ${error.message}`, success: false });
//   }
// };

const getCartsByUser = async (req, res) => {
  try {
    const userId = req.user.user._id;

    const cart = await cartModel.findOne({ user: userId });
    if (!cart) {
      return res.status(200).json({
        message: "No cart available. Please put something into cart",
        success: true,
      });
    }

    await cart.populate("items.product");
    res.status(200).json({
      message: "Cart Available",
      cart,
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Server error: ${error.message}`, success: false });
  }
};
const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.user._id;
    const { productId } = req.params;

    // Check if the product exists
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
      });
    }

    const updatedCart = await cartModel.findOneAndUpdate(
      { user: userId }, // Find the cart by the user ID
      { $pull: { items: { product: productId } } },
      { new: true, runValidators: true } // Return the updated cart
    );

    if (!updatedCart) {
      return res.status(404).json({
        message: "Cart not found",
        success: false,
      });
    }

    let totalPrice = 0;
    updatedCart.items.forEach((item) => {
      totalPrice += item.product.price * item.quantity;
    });

    updatedCart.totalPrice = totalPrice;
    await updatedCart.save();

    res.status(200).json({
      message: "Product removed from Cart",
      cart: updatedCart,
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Server error: ${error.message}`, success: false });
  }
};

const removeAllProductsFromCart = async (req, res) => {
  try {
    const userId = req.user.user._id;
    const cart = await cartModel.findOneAndDelete({ user: userId });

    if (!cart) {
      return res
        .status(404)
        .json({ message: "Cart not found", success: false });
    }

    return res.status(200).json({
      message: "All products have been deleted from the Cart.",
      cart,
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Server error: ${error.message}`, success: false });
  }
};

module.exports = {
  addToCart,
  getCartsByUser,
  removeFromCart,
  removeAllProductsFromCart,
};
