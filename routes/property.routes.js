//async function with try,catch and await
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Review = require("../models/Review.model");
const Property = require("../models/Property.model");
const {
  createProperty,
  deleteProperty,
  updateProperty,
} = require("../controllers/property");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

//  router.get("/property", async (req, res) => {
//    // Get all properties
//    try {
//      const properties = await Property.find();
//      res.json(properties);
//    } catch (error) {
//      res.status(500).json({ error: "Internal server error" });
//    }
//  });

// router.get("/property/:propertyId", async (req, res) => {
//   // Get a specific property by ID
//   try {
//     const property = await Property.findById(req.params.propertyId);
//     if (!property) {
//       return res.status(404).json({ error: "Property not found" });
//     }
//     res.json(property);
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// Render Property CREATE PAGE

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

// Get a specific property by ID
router.get("/property/:propertyId", (req, res) => {
  Property.findById(req.params.propertyId)
    .then((property) => {
      if (property) {
        res.render("properties/property", { property });
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
          title: `Rohan Retreat: "Edoras Haven"`,
          description: `Immerse yourself in the grandeur of the Rohirrim at "Edoras Haven." This majestic dwelling nestled amidst the rolling plains of Rohan offers a truly enchanting experience. The warm wooden interiors reflect the courageous spirit of the Rohirrim, while panoramic views of the vast landscape captivate your senses. Prepare for an adventure of a lifetime as you traverse the trails and feel the breeze of the grasslands. Giddy-up, for Rohan awaits!`,
          location: `Rohan, MiddleEarth South, 12345 ME`,
          price: 150,
          amenities: [
            "Spacious common room with fireplace",
            "Stables for horses",
            "Scenic balcony overlooking the vast plains",
          ],
          owner: new mongoose.Types.ObjectId(), // Set the owner ID with 'new'
          images: [
            "https://res.cloudinary.com/dxggkj0l2/image/upload/v1688376504/samples/properties/download-1_aot5vq.jpg",
            "https://res.cloudinary.com/dxggkj0l2/image/upload/v1688376504/samples/properties/download-5_zwo2di.jpg",
            "https://res.cloudinary.com/dxggkj0l2/image/upload/v1688376504/samples/properties/download-3_ri5f2l.jpg",
            "https://res.cloudinary.com/dxggkj0l2/image/upload/v1688376504/samples/properties/download-4_aafp8z.jpg",
            "https://res.cloudinary.com/dxggkj0l2/image/upload/v1688376504/samples/properties/download_kg9cls.jpg",
            "https://res.cloudinary.com/dxggkj0l2/image/upload/v1688376504/samples/properties/download-2_cjaa4d.jpg",
          ],
          maxGuests: 5,
        }),

        new Property({
          title: `Moria Marvel: "Gloamheart Abode"`,
          description: `Delve into the depths of the earth and uncover the hidden wonders of "Gloamheart Abode" in the legendary city of Moria. This subterranean sanctuary boasts intricate stone craftsmanship, reminiscent of the Dwarven heritage. Explore the labyrinthine tunnels and uncover the mysteries of Moria at your own pace. Get ready to be amazed by the ethereal glow of the phosphorescent fungi, casting an otherworldly light. Courage, dear traveler, for Moria beckons!`,
          location: `Mines of Moria, MiddleEarth North, 12345 ME`,
          price: 120,
          amenities: [
            "Dwarf-made stone bathtub",
            "Glowing fungi-lined pathways",
            "Hidden library of Dwarven lore",
          ],
          owner: new mongoose.Types.ObjectId(), // Set the owner ID with 'new'
          images: [
            "https://res.cloudinary.com/dxggkj0l2/image/upload/v1688376532/samples/properties/download-3_kspqtk.jpg",
            "https://res.cloudinary.com/dxggkj0l2/image/upload/v1688376532/samples/properties/download-5_dbqtiy.jpg",
            "https://res.cloudinary.com/dxggkj0l2/image/upload/v1688376532/samples/properties/download-4_w0fni8.jpg",
            "https://res.cloudinary.com/dxggkj0l2/image/upload/v1688376532/samples/properties/download-1_fbvvyy.jpg",
            "https://res.cloudinary.com/dxggkj0l2/image/upload/v1688376532/samples/properties/download_bg9zoh.jpg",
            "https://res.cloudinary.com/dxggkj0l2/image/upload/v1688376532/samples/properties/download-2_fvjhcm.jpg",
          ],
          maxGuests: 5,
        }),

        new Property({
          title: `Rivendell Refuge: "Starlight Haven"`,
          description: `Find solace in the serene sanctuary of "Starlight Haven," nestled amidst the breathtaking beauty of Rivendell. This elven abode offers respite from the tumultuous outside world. Elegant arches and ethereal waterfalls will transport you to a realm of tranquility. Delight in the elven craftsmanship, adorned with intricate carvings and delicate tapestries. Allow the melodies of nature to soothe your soul as you discover the wisdom of the elves. Welcome, weary traveler, to Rivendell's embrace.`,
          location: `Center-Rivendell, MiddleEarth South, 12345 ME`,
          price: 180,
          amenities: [
            "Serene meditation gardens",
            "Elven library of ancient knowledge",
            "Crystal-clear healing springs.",
          ],
          owner: new mongoose.Types.ObjectId(), // Set the owner ID with 'new'
          images: [
            "https://res.cloudinary.com/dxggkj0l2/image/upload/v1688376522/samples/properties/download-7_mume0x.jpg",
            "https://res.cloudinary.com/dxggkj0l2/image/upload/v1688376522/samples/properties/download_htgfuz.jpg",
            "https://res.cloudinary.com/dxggkj0l2/image/upload/v1688376522/samples/properties/download-5_kgppnl.jpg",
            "https://res.cloudinary.com/dxggkj0l2/image/upload/v1688376522/samples/properties/download-1_yyzhjv.jpg",
            "https://res.cloudinary.com/dxggkj0l2/image/upload/v1688376522/samples/properties/download-3_qwj0ss.jpg",
            "https://res.cloudinary.com/dxggkj0l2/image/upload/v1688376522/samples/properties/download-2_br4dwi.jpg",
          ],
          maxGuests: 5,
        }),

        new Property({
          title: `The Shire Hideaway: "Hobbiton Meadows"`,
          description: `Embark on a delightful journey to the enchanting "Hobbiton Meadows," a cozy haven nestled in the heart of the Shire. Immerse yourself in the idyllic lifestyle of the hobbits, surrounded by lush greenery and quaint hobbit holes. Savor hearty meals and indulgent second breakfasts while basking in the simple pleasures of life. Wander through the vibrant gardens and experience the warmth and hospitality of the hobbit community. Welcome, dear hobbit-at-heart, to the land of the Shire!`,
          location: `GollumCreek Village, MiddleEarth West, 12345 ME`,
          price: 90,
          amenities: [
            "Cozy fireplace for evenings of storytelling",
            "Hobbit-sized reading nooks",
            "Vegetable gardens for farm-to-table delights",
          ],
          owner: new mongoose.Types.ObjectId(), // Set the owner ID with 'new'
          images: [
            "https://res.cloudinary.com/dxggkj0l2/image/upload/v1688376491/samples/properties/download_gn5xrs.jpg",
            "https://res.cloudinary.com/dxggkj0l2/image/upload/v1688376491/samples/properties/download-5_lukee1.jpg",
            "https://res.cloudinary.com/dxggkj0l2/image/upload/v1688376491/samples/properties/download-6_bvehqw.jpg",
            "https://res.cloudinary.com/dxggkj0l2/image/upload/v1688376491/samples/properties/download-4_hpno9x.jpg",
            "https://res.cloudinary.com/dxggkj0l2/image/upload/v1688376490/samples/properties/download-1_bmuh9l.jpg",
            "https://res.cloudinary.com/dxggkj0l2/image/upload/v1688376490/samples/properties/download-3_carelc.jpg",
          ],
          maxGuests: 5,
        }),

        new Property({
          title: `Minas Morgul Enigma: "Shadow's Embrace"`,
          description: `Brace yourself for an eerie yet captivating experience at "Shadow's Embrace," situated within the haunted city of Minas Morgul. This ethereal dwelling offers a unique blend of darkness and mystique. Intricate Gothic architecture and flickering torches set the stage for an extraordinary journey. Embrace the whispers of the past as you explore the chilling beauty that lingers within these forsaken walls. Venture forth, intrepid traveler, for Minas Morgul reveals its secrets to those brave enough to seek them.`,
          location: `Minas Morgul-City, MiddleEarth North, 12345 ME`,
          price: 200,
          amenities: [
            "Moonlit rooftop terrace",
            "Cryptic library of forgotten tales",
            "Enigmatic candlelit dinners",
          ],
          owner: new mongoose.Types.ObjectId(), // Set the owner ID with 'new'
          images: [
            "https://res.cloudinary.com/dxggkj0l2/image/upload/v1688379371/samples/properties/download-4_aib6p5.jpg",
            "https://res.cloudinary.com/dxggkj0l2/image/upload/v1688379371/samples/properties/download-5_bxeh8m.jpg",
            "https://res.cloudinary.com/dxggkj0l2/image/upload/v1688376559/samples/properties/download-6_ikxmo1.jpg",
            "https://res.cloudinary.com/dxggkj0l2/image/upload/v1688379371/samples/properties/download-3_huapin.jpg",
            "https://res.cloudinary.com/dxggkj0l2/image/upload/v1688379372/samples/properties/download-7_jtkzsu.jpg",
            "https://res.cloudinary.com/dxggkj0l2/image/upload/v1688379372/samples/properties/download_xinm7t.jpg",
          ],
          maxGuests: 5,
        }),

        new Property({
          title: `Erebor Abundance: "Dragon's Hoard"`,
          description: `Prepare to be awe-struck by the grandeur of "Dragon's Hoard," a regal abode nestled deep within the heart of Erebor, the Lonely Mountain. Marvel at the Dwarven craftsmanship that adorns every corner, showcasing the wealth of the mountain kingdom. Enter a world of opulence and embrace the echoes of a bygone era. Immerse yourself in the tales of the dwarves and their fabled treasure. Claim your own share of grandeur within the halls of Erebor, noble traveler!`,
          location: `Lonely Mountain, MiddleEarth Center, 12345 ME`,
          price: 250,
          amenities: [
            "Ornate banquet hall for feasts fit for a king",
            "Dwarven forge for crafters at heart",
            "Hidden treasure chamber for the adventurous at spirit",
          ],
          owner: new mongoose.Types.ObjectId(), // Set the owner ID with 'new'
          images: [
            "https://res.cloudinary.com/dxggkj0l2/image/upload/v1688376252/samples/properties/download-3_fza1rt.jpg",
            "https://res.cloudinary.com/dxggkj0l2/image/upload/v1688376252/samples/properties/download_cgsbb2.jpg",
            "https://res.cloudinary.com/dxggkj0l2/image/upload/v1688376252/samples/properties/download-1_j3o3nv.jpg",
            "https://res.cloudinary.com/dxggkj0l2/image/upload/v1688376251/samples/properties/download-4_nkvur1.jpg",
            "https://res.cloudinary.com/dxggkj0l2/image/upload/v1688376252/samples/properties/download-2_hglvfr.jpg",
            "https://res.cloudinary.com/dxggkj0l2/image/upload/v1688376252/samples/properties/download-8_kcyphr.jpg",
          ],
          maxGuests: 5,
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










// router.get("property/:propertyId/review",(req,res)=>{
// Property.findById(req.params.propertyId).then((property) => {
//   if (property) {
//     res.render("review", { property });
//   } else {
//     return res.status(404).json({ error: "Property not found" });
//   }
// }).catch((error))=>{
//   res.status(500).json({error:"Internal server error"});
// }
// }
// )




router.get("/property/:propertyId/review", async (req, res) => {
  Property.findById(req.params.propertyId)
    .then((property) => {
      if (property) {
        console.log(property);
        res.render("review", { property });
      } else {
        return res.status(404).json({ error: "Property not found" });
      }
    })})





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
