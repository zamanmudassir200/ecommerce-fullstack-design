const productModel = require("../models/productModel");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");

const storage = multer.diskStorage({});
const upload = multer({ storage });

const createProduct = async (req, res) => {
  const { productName, description, price, brand, stock } = req.body;
  const files = req.files; // The uploaded files (images)
  try {
    // Check if required fields are provided
    if (!productName || !description || !price || !brand || !stock || !files) {
      return res
        .status(400)
        .json({ message: "All fields are required.", success: false });
    }

    // Upload images to Cloudinary`
    const uploadPromises = files.map((file) =>
      cloudinary.uploader.upload(file.path, {
        folder: "products", // Folder name in Cloudinary
      })
    );

    const uploadedImages = await Promise.all(uploadPromises);
    const imageUrls = uploadedImages.map((img) => img.secure_url); // Store the URLs

    // Create the product and save to the database
    const createdProduct = await productModel.create({
      productName,
      description,
      price,
      brand,
      stock,
      images: imageUrls, // Save the Cloudinary image URLs
    });

    // Send response
    res.status(201).json({
      message: "Product created successfully",
      product: createdProduct,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
};

const editProduct = async (req, res) => {
  const { productId } = req.params;
  const { productName, description, price, brand, stock } = req.body;
  const files = req.files; // Uploaded files

  try {
    // Find the existing product by ID
    const product = await productModel.findOne(productId);

    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found.", success: false });
    }

    // Update the fields if they are provided in the request
    product.productName = productName || product.productName;
    product.description = description || product.description;
    product.price = price || product.price;
    product.brand = brand || product.brand;
    product.stock = stock || product.stock;

    // If there are new images, upload them to Cloudinary
    if (files && files.length > 0) {
      // Upload new images to Cloudinary (we will only save URLs here)
      const uploadPromises = files.map((file) =>
        cloudinary.uploader.upload(file.path, { folder: "products" })
      );
      const uploadedImages = await Promise.all(uploadPromises);

      // Store only secure_url (ignore public_id)
      const imageInfo = uploadedImages.map((img) => img.secure_url);
      product.images = imageInfo; // Update the product's images with URLs only
    }

    // Save the updated product to the database
    const updatedProduct = await product.save();

    // Send response
    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await productModel.findByIdAndDelete(id);
    if (!deletedProduct) {
      res.status(404).json({ message: "Product not found", success: false });
    }
    res.status(200).json({
      message: "Product deleted successfully",
      product: deletedProduct,
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Server error: ${error.message}`, success: false });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const allProducts = await productModel.find();
    if (!allProducts) {
      res.status(404).json({ message: "No products found", success: false });
    }
    res.status(200).json({
      message: "All Products found",
      count: allProducts.length,
      products: allProducts,
      success: true,
    });
  } catch (error) {}
};

module.exports = {
  createProduct,
  editProduct,
  deleteProduct,
  getAllProducts,
  upload,
};
