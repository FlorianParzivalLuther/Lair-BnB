const express = require("express");
const router = express.Router();
const Host = require("../models/Host.model");
const User = require("../models/User.model");

router.get("/user", async (req, res) => {
  console.log("We're here")
  const { currentHost, currentUser } = req.session;
  if (currentHost) {
    console.log("There was a host");
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

  // if (!req.session.currentUser) {
  //   res.redirect("/loginUser");
  // } else {
  //   const loggedHost = await Host.findById(req.session.currentUser.id);
  //   console.log("loggedHost", loggedHost);
  //   if (loggedHost) {
  //     res.redirect("/host");
  //   } else {
  //     try {
  //       const currentUser = req.session.currentUser;
  //       console.log(currentUser);
  //       if (currentUser) {
  //         const user = await User.findById(currentUser.id);
  //         if (user) {
  //           res.render("user", { user });
  //         } else {
  //           res.redirect("/loginUser");
  //         }
  //       } else {
  //         res.redirect("/user");
  //       }
  //     } catch (error) {
  //       res.status(500).json({ error: "Internal server error" });
  //     }
  //   }
  // }
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
