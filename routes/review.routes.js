const express = require("express");
const router = express.Router();

const Review = require("../models/Review.model");


router.get("/review/:reviewId", async (req, res) => {
  // Get a specific review by ID
  try {
    const review = await Review.findById(req.params.reviewId);
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.json(review);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Rendering example
router.get("/review", async (req, res) => {
  try {
    const reviews = await Review.find();
    res.render("review", { reviews });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
