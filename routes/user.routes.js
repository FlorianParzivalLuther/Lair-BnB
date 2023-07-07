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
  // console.log(req.session);
  // console.log(req.params);
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        console.log(user);
        res.render("user-edit", { user: req.session.currentUser });
      } else {
        return res.status(404).json({ error: "user not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Internal server error" });
    });
});

router.post("/user/:userId", async (req, res) => {
  console.log(req.session);
  console.log(req.body);
  const userId = req.params.userId;
  // console.log(currentUser);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: req.body },
      { new: true }
    );
    req.session.currentUser = updatedUser;
    res.status(200).redirect("/user");
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get("/user/:userId", async (req, res) => {
//   // Get a specific user by ID
//   try {
//     const user = await User.findById(req.params.userId);
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }
//     res.render("user");
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

module.exports = router;
