const express = require("express");

const { authenticationToken } = require("../middlewares/authenticationToken");
const { addReview, getAllReviews } = require("../controllers/reviewController");

const router = express.Router();

router.post("/:productId", authenticationToken, addReview);
router.get("/", getAllReviews);
module.exports = router;
