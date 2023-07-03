//async function with try,catch and await
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Property = require("../models/Property.model");

//  router.get("/property", async (req, res) => {
//    // Get all properties
//    try {
//      const properties = await Property.find();
//      res.json(properties);
//    } catch (error) {
//      res.status(500).json({ error: "Internal server error" });
//    }
//  });

router.get("/property/:propertyId", async (req, res) => {
  // Get a specific property by ID
  try {
    const property = await Property.findById(req.params.propertyId);
    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }
    res.json(property);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Rendering example
router.get("/property", async (req, res) => {
  try {
    const properties = await Property.find();
    res.render("property", { properties });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
//! cant understand why there is a json shown when disabled
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const createTestProperties = () => {
  Property.deleteMany() // Clear existing properties
    .then(() => {
      const properties = [
        new Property({
          title: "Property 1",
          description: "Description for Property 1",
          location: "Location 1",
          price: 100,
          amenities: ["Amenity 1", "Amenity 2"],
          owner: new mongoose.Types.ObjectId(), // Set the owner ID with 'new'
          images: [
            "https://picsum.photos/id/1018/800/600",
            "https://picsum.photos/id/1015/800/600",
            "https://picsum.photos/id/1016/800/600",
            "https://picsum.photos/id/1019/800/600",
            "https://picsum.photos/id/1020/800/600",
            "https://picsum.photos/id/1022/800/600",
          ],
        }),
        new Property({
          title: "Property 2",
          description: "Description for Property 2",
          location: "Location 2",
          price: 200,
          amenities: ["Amenity 3", "Amenity 4"],
          owner: new mongoose.Types.ObjectId(), // Set the owner ID with 'new'
          images: [
            "https://picsum.photos/id/1023/800/600",
            "https://picsum.photos/id/1024/800/600",
            "https://picsum.photos/id/1025/800/600",
            "https://picsum.photos/id/1026/800/600",
            "https://picsum.photos/id/1027/800/600",
            "https://picsum.photos/id/1028/800/600",
          ],
        }),
        new Property({
          title: "Property 3",
          description: "Description for Property 3",
          location: "Location 3",
          price: 300,
          amenities: ["Amenity 5", "Amenity 6"],
          owner: new mongoose.Types.ObjectId(), // Set the owner ID with 'new'
          images: [
            "https://picsum.photos/id/1029/800/600",
            "https://picsum.photos/id/1030/800/600",
            "https://picsum.photos/id/1031/800/600",
            "https://picsum.photos/id/1032/800/600",
            "https://picsum.photos/id/1033/800/600",
            "https://picsum.photos/id/1034/800/600",
          ],
        }),
      ];

      return Property.insertMany(properties);
    })
    .then(() => {
      console.log("Test properties created successfully.");
    })
    .catch((error) => {
      console.error("Error creating test properties:", error);
    })
    .finally(() => {
      // mongoose.disconnect();
    });
};

createTestProperties();
//!

module.exports = router;
