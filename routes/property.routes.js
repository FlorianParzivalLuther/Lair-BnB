//async function with try,catch and await
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

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.get("/property/create", (req, res) => {
  res.render("properties/create-property");
});

// Post Property / Create Property

router.post("/property/create", upload.array("images"), createProperty);

// Get Edit page
router.get("/property/:propertyId/edit", (req, res) => {
  Property.findById(req.params.propertyId)
    .then((property) => {
      if (property) {
        console.log(property);
        res.render("properties/edit-property", { property });
      } else {
        return res.status(404).json({ error: "Property not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Internal server error" });
    });
  //console.log(propertyId);
});

// Update Property
router.post("/property/:propertyId/edit", updateProperty);

// Delete Property
router.post("/property/:propertyId", deleteProperty);

// Middleware to parse cookies
const app = express();
app.use(cookieParser());

// // Get a specific property by ID
// router.get("/property/:propertyId", (req, res) => {
//   Property.findById(req.params.propertyId)
//     .then((property) => {
//       if (property) {
//         // Retrieve user information from cookie
//         const userInfo = req.cookies.userInfo;

//         res.render("properties/property", { property, userInfo });
//       } else {
//         return res.status(404).json({ error: "Property not found" });
//       }
//     })
//     .catch((error) => {
//       res.status(500).json({ error: "Internal server error" });
//     });
// });

// Get a specific property by ID
router.get("/property/:propertyId", (req, res) => {
  let isLoggedIn = false;
  Property.findById(req.params.propertyId)
    .populate({ path: "reviews" })
    .then((property) => {
      if (property) {
        if (req.session.currentUser) {
          isLoggedIn = true;
        }
        res.render("properties/property", {
          property: property,
          isLoggedIn: isLoggedIn,
        });
      } else {
        return res.status(404).json({ error: "Property not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Internal server error" });
    });
});

// Rendering example
router.get("/property", async (req, res) => {
  try {
    const properties = await Property.find();
    res.render("properties/property", { properties });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/property/:propertyId/review", async (req, res) => {
  Property.findById(req.params.propertyId).then((property) => {
    if (property) {
      console.log(property);
      res.render("review", { property });
    } else {
      return res.status(404).json({ error: "Property not found" });
    }
  });
});

// POST route for submitting a review
router.post("property/:propertyId/review", async (req, res) => {
  try {
    const { comment, rating } = req.body;

    // Validate the rating value
    if (rating < 1 || rating > 10) {
      return res.status(400).json({ error: "No rating selected - Error" });
    }

    // Find the property by ID
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    // Create a new review based on the request body
    const newReview = new Review({
      comment,
      property: property._id,
      guest: user._id,
      rating,
    });

    // Save the review to the database
    const savedReview = await newReview.save();
    console.log("Safed Review");

    // Redirect the user to the home page or perform any other desired action
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
