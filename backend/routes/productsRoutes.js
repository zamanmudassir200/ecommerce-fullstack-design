const express = require("express");
const {
  createProduct,
  editProduct,
  deleteProduct,
  getAllProducts,
  upload,
} = require("../controllers/productsController");
const router = express.Router();
const { authenticationToken } = require("../middlewares/authenticationToken");

router.post("/", upload.array("images", 10), createProduct); // 10 is the max number of images allowed
router.patch(
  "/:id",
  authenticationToken,
  upload.array("images", 10),
  editProduct
);
router.delete("/:id", authenticationToken, deleteProduct);
router.get("/", authenticationToken, getAllProducts);

module.exports = router;
