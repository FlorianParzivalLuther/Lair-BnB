const express = require("express");
const router = express.Router();

const User = require("../models/User.model");


// router.get("/user", async (req, res) => {
//   // Get all users
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

router.get("/user/:userId", async (req, res) => {
  // Get a specific user by ID
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Rendering example
router.get("/user", async (req, res) => {
  try {
    const users = await User.find();
    res.render("user", { users });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
