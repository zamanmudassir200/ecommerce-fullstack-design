const productModel = require("../models/productModel");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const categoryModel = require("../models/categoryModel");
const subCategoryModel = require("../models/categoryModel");
const storage = multer.diskStorage({});
const upload = multer({ storage });
const userModel = require("../models/userModel");

const createProduct = async (req, res) => {
  const { id } = req.user;
  const existingUser = await userModel.findById(id);
  if (!existingUser) {
    return res.status(404).json({ message: "User not found", success: false });
  }
  const {
    productName,
    description,
    price,
    brand,
    stock,
    discount,
    category, // ID of the main category
    subCategory, // ID of the subcategory
    rating,
    reviews,
  } = req.body;
  const files = req.files;

  try {
    // Required fields check
    if (!productName || !description || !price || !brand || !stock || !files) {
      return res.status(400).json({
        message: "All fields including category and images are required.",
        success: false,
      });
    }

    // Find category by ID
    const categoryObj = await categoryModel.findById(category);
    if (!categoryObj) {
      return res.status(400).json({
        message: "Category does not exist.",
        success: false,
      });
    }

    // Find subcategory by ID (if provided)
    let subCategoryObj = null;
    if (subCategory) {
      subCategoryObj = await subCategoryModel.findById(subCategory);
      if (!subCategoryObj) {
        return res.status(400).json({
          message: "Subcategory does not exist.",
          success: false,
        });
      }
    }

    // Upload images to Cloudinary
    const uploadPromises = files.map((file) =>
      cloudinary.uploader.upload(file.path, { folder: "products" })
    );
    const uploadedImages = await Promise.all(uploadPromises);
    const imageUrls = uploadedImages.map((img) => img.secure_url);

    // Calculate discounted price (if discount exists)
    // let finalPrice = price;
    // if (discount > 0) {
    //   finalPrice = price - (price * discount) / 100;
    // }

    // Create product with category and subcategory (if provided)
    const createdProduct = await productModel.create({
      user: existingUser._id,
      productName,
      description,
      price,
      brand,
      stock,
      images: imageUrls,
      discount,
      category: categoryObj._id,
      subCategory: subCategoryObj._id, // Save subcategory if available
      rating,
      reviews,
    });

    // Manually populate category and subcategory
    const populatedProduct = await productModel
      .findById(createdProduct._id)
      .populate("category")
      .populate("subCategory");

    return res.status(201).json({
      message: "Product created successfully.",
      product: populatedProduct, // Send the populated product in the response
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Server error: ${error.message}`, success: false });
  }
};

const editProduct = async (req, res) => {
  const { productId } = req.params;
  const {
    productName,
    description,
    price,
    brand,
    stock,
    discount,
    category, // ID of the main category
    subCategory, // ID of the subcategory
  } = req.body;
  const files = req.files; // Uploaded files

  try {
    // Find the existing product by ID and populate both category and subCategory fields
    const product = await productModel.findById(productId).populate({
      path: "category",
      populate: {
        path: "subCategories", // Populate subCategories within the category
      },
    });

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
    product.discount = discount || product.discount;

    // Update category if provided
    if (category) {
      const categoryObj = await categoryModel
        .findById(category)
        .populate("subCategories");
      if (!categoryObj) {
        return res.status(400).json({
          message: "Category does not exist.",
          success: false,
        });
      }
      product.category = categoryObj._id;
    }

    // Update subCategory if provided
    if (subCategory) {
      const subCategoryObj = await subCategoryModel.findById(subCategory);
      if (!subCategoryObj) {
        return res.status(400).json({
          message: "Subcategory does not exist.",
          success: false,
        });
      }
      product.subCategory = subCategoryObj._id;
    }

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
    res
      .status(500)
      .json({ message: `Server error: ${error.message}`, success: false });
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
    const allProducts = await productModel
      .find()
      .populate({
        path: "category",
        model: "category",
        options: { strictPopulate: false }, // Allow missing category
      })
      .populate({
        path: "subCategory",
        model: "category",
        options: { strictPopulate: false }, // Allow missing subCategory
      })
      .populate("user");

    if (!allProducts || allProducts.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found", success: false });
    }

    res.status(200).json({
      message: "All Products found",
      count: allProducts.length,
      products: allProducts,
      success: true,
    });
  } catch (error) {
    console.log("Error:", error);
    res
      .status(500)
      .json({ message: `Server error: ${error.message}`, success: false });
  }
};

// const getAllProducts = async (req, res) => {
//   try {
//     let allProducts = await productModel.find();
//     try {
//       allProducts = await productModel.populate(allProducts, {
//         path: "category",
//       });
//     } catch (categoryError) {
//       console.log("Error populating category:", categoryError);
//     }
//     try {
//       allProducts = await productModel.populate(allProducts, {
//         path: "subCategory",
//       });
//     } catch (subCategoryError) {
//       console.log("Error populating subCategory:", subCategoryError);
//     }

//     if (!allProducts || allProducts.length === 0) {
//       return res
//         .status(404)
//         .json({ message: "No products found", success: false });
//     }

//     return res.status(200).json({
//       message: "All Products found",
//       count: allProducts.length,
//       products: allProducts,
//       success: true,
//     });
//   } catch (error) {
//     console.log("Server error:", error);
//     return res
//       .status(500)
//       .json({ message: `Server error: ${error.message}`, success: false });
//   }
// };

const createCategory = async (req, res) => {
  const { name, description } = req.body;

  try {
    // Check if categoryName is provided
    if (!name) {
      return res.status(400).json({
        message: "Category name is required.",
        success: false,
      });
    }

    // Check if category already exists
    const category = await categoryModel.findOne({ name });
    if (category) {
      return res.status(200).json({
        message: "Category already exists.",
        success: true,
        category,
      });
    }

    // Create new category if not already existing
    const newCategory = await categoryModel.create({
      name,
      description,
    });

    res.status(201).json({
      message: "Category created successfully.",
      category: newCategory,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: `Server error: ${error.message}`,
      success: false,
    });
  }
};

// POST /subcategories
const createSubCategory = async (req, res) => {
  const { name, categoryId, description } = req.body;

  try {
    // Validate required fields
    if (!name || !categoryId) {
      return res.status(400).json({
        message: "Subcategory name and category ID are required.",
        success: false,
      });
    }

    // Check if the category exists
    const category = await categoryModel.findById(categoryId);
    if (!category) {
      return res.status(404).json({
        message: "Category not found.",
        success: false,
      });
    }

    // Create the new subcategory
    const newSubCategory = await subCategoryModel.create({
      name,
      description,
    });
    // Add the new subcategory's ID to the category's subCategories array
    category.subCategories.push(newSubCategory._id);

    await newSubCategory.save();
    await category.save(); // Save the updated category
    // Populate the subCategories field in the category
    const populatedCategory = await categoryModel
      .findById(categoryId)
      .populate("subCategories");
    // await category.populate("subCategories").execPopulate();

    res.status(201).json({
      message: "Subcategory created successfully.",
      subCategory: newSubCategory,
      category: category,
      success: true,
    });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ message: `Server error: ${error.message}`, success: false });
  }
};
// const getAllCategories = async (_req, res) => {
//   try {
//     const { user } = req.user;
//     console.log("user._id", user._id);
//     const categories = await categoryModel.find();
//     if (!categories) {
//       return res
//         .status(200)
//         .json({ message: "No categories found", success: true });
//     }

//     return res.status(200).json({
//       message: "All Categories",
//       count: categories.length,
//       categories,
//     });
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ message: `Server error: ${error.message}`, success: false });
//   }
// };

const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find(); // Fetch directly from the category model

    if (!categories || categories.length === 0) {
      return res.status(404).json({
        message: "No categories found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "All categories found",
      count: categories.length,
      categories,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Server error: ${error.message}`,
      success: false,
    });
  }
};

const editCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { name, description } = req.body;
    const existingCategory = await categoryModel.findById(categoryId);
    if (!existingCategory) {
      res.status(404).json({ message: "Category not found", success: false });
    }
    const updatedCategory = await categoryModel.findByIdAndUpdate(
      existingCategory._id,
      { name, description },
      { new: true }
    );

    res.status(201).json({
      message: "Category Updated successfully",
      success: true,
      category: updatedCategory,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Server error: ${error.message}`, success: false });
  }
};
const editSubCategory = async (req, res) => {
  try {
    const { subCategoryId } = req.params;
    const { name, description } = req.body;
    const existingSubCategory = await subCategoryModel.findById(subCategoryId);
    if (!existingSubCategory) {
      res.status(404).json({ message: "Category not found", success: false });
    }
    const updatedSubCategory = await subCategoryModel.findByIdAndUpdate(
      existingSubCategory._id,
      { name, description },
      { new: true }
    );

    res.status(201).json({
      message: "SubCategory Updated successfully",
      success: true,
      subCategory: updatedSubCategory,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Server error: ${error.message}`, success: false });
  }
};
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel
      .findById(id)
      .populate("category")
      .populate("subCategory")
      .populate("user");
    if (!product) {
      res.status(404).json({ message: "Product not found", success: false });
    }

    res.status(200).json({ message: "Product found", product, success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Server error: ${error.message}`, success: false });
  }
};

const addToWishList = async (req, res) => {
  try {
    const { productId } = req.params;
    const { id } = req.user;

    // Verify product exists
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
      });
    }

    // Update user's wishlist and return populated data
    const updatedUser = await userModel
      .findByIdAndUpdate(
        id,
        { $addToSet: { wishList: productId } },
        {
          new: true,
        }
      )
      .populate("wishList"); // Populate wishlist if needed

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Product added to wishlist",
      success: true,
      product,
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        wishList: updatedUser.wishList,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

const removeFromWishList = async (req, res) => {
  try {
    const { id } = req.user; // Changed from req.user.user._id
    const { productId } = req.params;

    // Verify product exists
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
      });
    }

    // Update user's wishlist by removing the product
    const updatedUser = await userModel
      .findByIdAndUpdate(
        id,
        { $pull: { wishList: productId } }, // Correct way to remove from array
        {
          new: true,
          runValidators: true,
        }
      )
      .populate("wishList");

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Product removed from wishlist",
      success: true,
      product,
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        wishList: updatedUser.wishList,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};
const getAllProductsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const allProducts = await productModel.find({ user: userId });
    console.log("allproducts", allProducts);
    if (!allProducts) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    return res.status(200).json({
      message: "Products found by user",
      count: allProducts.length,
      allProducts,
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Server error ${error}`, success: false });
  }
};

module.exports = {
  createProduct,
  addToWishList,
  editProduct,
  deleteProduct,
  getAllProducts,
  removeFromWishList,
  upload,
  createSubCategory,
  createCategory,
  getProductById,
  editCategory,
  editSubCategory,
  getAllCategories,
  getAllProductsByUser,
};
