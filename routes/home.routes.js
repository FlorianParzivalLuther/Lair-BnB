const express = require("express");
const router = express.Router();

// Define routes for the index/home page
router.get("/", (req, res) => {
  // Handle index route logic
  res.render("home");
});

router.get("/home", (req, res) => {
  // Handle index route logic
  res.render("home");
});

// Other index routes...

module.exports = router;
