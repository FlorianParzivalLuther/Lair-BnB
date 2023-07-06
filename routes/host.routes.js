const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const Host = require("../models/Host.model");
const Property = require("../models/Property.model");

// router.get("/host", async (req, res) => {
//   const { currentHost, currentUser } = req.session;
//   console.log(currentHost);

//   const hostId = currentHost.id;

//   if (currentUser) {
//     res.redirect("/user");
//     return;
//   } else {
//     if (currentHost) {
//       Property.find({ owner: hostId })
//         .populate("owner") // Populate the 'ownerId' field
//         .then((properties) => {
//           res.render("properties", { properties });
//         })
//         .catch((error) => {
//           console.error(error);
//         });

//       res.render("host", { hostInSession: currentHost });
//       return;
//     } else {
//       res.redirect("/loginHost");
//       return;
//     }
//   }
// });

router.get("/host", async (req, res) => {
  const { currentHost, currentUser } = req.session;
  console.log(currentHost);

  const hostId = currentHost._id;

  if (currentUser) {
    res.redirect("/user");
    return;
  }

  if (currentHost) {
    Property.find({ owner: hostId })
      // .populate("createdProperties")
      .then((properties) => {
        res.render("host", { hostInSession: currentHost, properties });
        console.log(properties);
      })
      .catch((error) => {
        console.error(error);
        res.redirect("/error"); // Handle any error
      });

    return;
  }

  res.redirect("/loginHost");
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
