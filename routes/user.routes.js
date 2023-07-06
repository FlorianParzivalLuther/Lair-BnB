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

// Get edit page
router.get("/user/:userId/edit", (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        console.log(user);
        res.render("user-edit");
      } else {
        return res.status(404).json({ error: "user not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Internal server error" });
    });
});

// Post edited user

router.post("/user/:userId/edit", async (req, res) => {
  console.log("booooooddddddyyyyyyy", req.body);
  console.log(req.params);
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: req.body,
      },
      { new: true }
    );
    // console.log(updatedProperty);
    res.status(200).redirect(`/user`);
  } catch (err) {
    res.status(500).json(err);
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
