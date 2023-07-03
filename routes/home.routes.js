const express = require("express");
const router = express.Router();
const Property = require("../models/Property.model");

// Define routes for the index/home page
// router.get("/", (req, res) => {
//   // Handle index route logic
//   res.render("home");
// });
// router.get("/home", (req, res) => {
//   // Handle index route logic
//   res.render("home");
// });
// router.get("/", (req, res, next) => {
//   console.log("found home");
//   Property.find()
//     .then((allThePropertiesFromDB) => {
//       console.log("Retrieved properties from DB:", allThePropertiesFromDB);
//       res.render("/", { properties: allThePropertiesFromDB }); // pass `allThePropertiesFromDB` as `properties` to the view
//     })
//     .catch((error) => {
//       console.log("Error while getting the properties from the DB: ", error);
//       next(error);
//     });
// });


router.get("/", (req, res, next) => {
  console.log("found home");
  Property.find()
    .then((allThePropertiesFromDB) => {
      console.log("Retrieved properties from DB:", allThePropertiesFromDB);
      res.render("home", { properties: allThePropertiesFromDB }); // Render the "home" view file
    })
    .catch((error) => {
      console.log("Error while getting the properties from the DB: ", error);
      next(error);
    });
});


module.exports = router;
