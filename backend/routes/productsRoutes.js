const express = require("express");
const {
  createProduct,
  editProduct,
  deleteProduct,
  getAllProducts,
  upload,
  editCategory,
  createCategory,
  createSubCategory,
  getProductById,
  editSubCategory,
  getSearchProducts,
  removeFromWishList,
  addToWishList,
  getAllProductsByUser,
} = require("../controllers/productsController");
const router = express.Router();
const { authenticationToken } = require("../middlewares/authenticationToken");

router.post(
  "/",
  upload.array("images", 10),
  authenticationToken,
  createProduct
); // 10 is the max number of images allowed
router.patch(
  "/:productId",
  authenticationToken,
  upload.array("images", 10),
  editProduct
);
router.delete("/:id", authenticationToken, deleteProduct);
router.get("/", getAllProducts);
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
router.get(
  "/getAllProductsByUser/:userId",
  authenticationToken,
  getAllProductsByUser
);

router.get("/search/product", getSearchProducts);
module.exports = router;
