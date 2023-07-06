const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Review = require("../models/Review.model");


const User = require("../models/User.model");
const Property = require("../models/Property.model");
const cookieParser = require("cookie-parser");
const {
  createProperty,
  deleteProperty,
  updateProperty,
} = require("../controllers/property");


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

// router.post("/:propertyId/review", async (req, res) => {
//   try {
//     const { rating, comment } = req.body;
//     const propertyId = req.params.propertyId;
//     const guestId = req.session.currentUser._id;

//     // Create the review
//     const newReview = new Review({
//       property: propertyId,
//       guest: guestId,
//       rating,
//       comment,
//       datePosted: Date.now(),
//     });

//     // Save the review
//     const savedReview = await newReview.save();

//     // Redirect back to the property/:propertyId route
//     res.redirect(`/property/${propertyId}`);
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// router.post("/property/:propertyId/review", async (req, res) => {
//   try {
//     const { rating, comment } = req.body;
//     const propertyId = req.params.propertyId;
//     const guestId = req.session.currentUser._id;

//     const newReview = new Review({
//       property: propertyId,
//       guest: guestId,
//       rating,
//       comment,
//       datePosted: Date.now(),
//     });

//     const savedReview = await newReview.save();

//     // Update the property with the newly created review
//     await Property.findByIdAndUpdate(propertyId, {
//       $push: { reviews: savedReview._id },
//     });

//     res.redirect(`/property/${propertyId}`);
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

router.post("/:propertyId/review", async (req, res) => {
  try {
    console.log(req.body);
    const { rating, comment } = req.body;
    const propertyId = req.params.propertyId;
    const guestId = req.session.currentUser._id;

    const newReview = new Review({
      property: propertyId,
      guest: guestId,
      rating,
      comment,
      datePosted: Date.now(),
    });

    // Saving
    const savedReview = await newReview.save();
    const updated = await Property.findByIdAndUpdate(propertyId, {
      $push: { reviews: savedReview },
    });
    // back to the property/:propertyId route
    res.redirect(`/property/${propertyId}`);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
