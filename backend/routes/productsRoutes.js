const express = require("express");
const {
  createProduct,
  editProduct,
  deleteProduct,
  getAllCategories,
  getAllProducts,
  upload,
  editCategory,
  createCategory,
  createSubCategory,
  getProductById,
  editSubCategory,
  removeFromWishList,
  addToWishList,
} = require("../controllers/productsController");
const router = express.Router();
const { authenticationToken } = require("../middlewares/authenticationToken");

router.post("/", upload.array("images", 10), createProduct); // 10 is the max number of images allowed
router.patch(
  "/:productId",
  authenticationToken,
  upload.array("images", 10),
  editProduct
);
router.delete("/:id", authenticationToken, deleteProduct);
router.get("/", authenticationToken, getAllProducts);
router.get("/:id", authenticationToken, getProductById);
router.post("/create-category", authenticationToken, createCategory);
router.post("/create-subcategory", authenticationToken, createSubCategory);
router.patch("/edit-category/:categoryId", authenticationToken, editCategory);
router.patch(
  "/edit-subCategory/:subCategoryId",
  authenticationToken,
  editSubCategory
);
router.patch("/add-to-wishlist/:productId", authenticationToken, addToWishList);
router.patch(
  "/remove-from-wishlist/:productId",
  authenticationToken,
  removeFromWishList
);

module.exports = router;
