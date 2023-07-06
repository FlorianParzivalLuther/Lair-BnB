const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const Host = require("../models/Host.model");
const Property = require("../models/Property.model");

router.get("/host", async (req, res) => {
  const { currentHost, currentUser } = req.session;

  if (currentUser) {
    res.redirect("/user");
    return;
  } else if (currentHost) {
    const hostId = currentHost._id;

    Property.find({ owner: hostId })
      .populate("owner")
      .then((properties) => {
        console.log(hostId);
        console.log("properties", properties);
        res.render("host", {
          hostInSession: currentHost,
          properties: properties,
        });
        console.log(properties);
      })
      .catch((error) => {
        console.error(error);
        res.redirect("/error");
      });

    return;
  } else {
    res.redirect("/loginHost");
    return;
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

module.exports = router;
