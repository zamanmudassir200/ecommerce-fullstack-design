const express = require("express");
const { getAllCategories } = require("../controllers/productsController");
const { authenticationToken } = require("../middlewares/authenticationToken");
const router = express.Router();

router.get("/get-categories", getAllCategories);
module.exports = router;
