const express = require("express");
const router = express.Router();

const Review = require("../models/Review.model");

// router.get("/review", async (req, res) => {
//   // Get all reviews
//   try {
//     const reviews = await Review.find();
//     res.json(reviews);
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

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

// POST route for submitting a review
router.post("/review", async (req, res) => {
  try {
    // Create a new review based on the request body
    const newReview = new Review(req.body);
    // Save the review to the database
    const savedReview = await newReview.save();
    // Redirect the user to the home page or perform any other desired action
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
