const express = require("express");
const router = express.Router();
const Host = require("../models/Host.model");
const User = require("../models/User.model");

router.get("/user", async (req, res) => {
  const { currentHost, currentUser } = req.session;
  if (currentHost) {
    res.redirect("/host");
    return;
  } else {
    if (currentUser) {
      console.log("there was no host, but a user");
      res.render("user", { userInSession: currentUser });
      return;
    } else {
      res.redirect("/loginUser");
      return;
    }
  }
});




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

module.exports = router;
