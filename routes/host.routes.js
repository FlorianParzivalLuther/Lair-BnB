const express = require("express");
const router = express.Router();

const Host = require("../models/Host.model");
const { loginHost } = require("../controllers/auth");

router.get("/", async (req, res) => {
  try {
    const currentUser = req.session.currentUser;
    console.log(currentUser);
    if (currentUser) {
      const host = await Host.findById(currentUser.id);
      if (host) {
        const hosts = await Host.find();
        res.render("host", { hosts });
      } else {
        res.redirect("/loginHost");
      }
    } else {
      res.redirect("/loginHost");
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/host/:hostId", async (req, res) => {
  // Get a specific user by ID
  try {
    const host = await Host.findById(req.params.hostId);
    if (!host) {
      return res.status(404).json({ error: "Host not found" });
    }
    res.json(host);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Rendering example

module.exports = router;
