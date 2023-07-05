const { Router } = require("express");
const router = new Router();
const { registerUser, registerHost } = require("../controllers/auth.js");
const User = require("../models/User.model.js");
const Host = require("../models/Host.model.js");
const bcrypt = require("bcrypt");
const { login } = require("../controllers/auth.js");
const { verifyToken } = require("../middleware/auth.middleware.js");
const {
  isLoggedIn,
  isLoggedOut,
} = require("../middleware/route-guard.middleware.js");

// SIGNING UP AS A USER
router.get("/userSignup", async (req, res, next) => {
  if (req.session.currentUser) {
    const user = await User.findOne(req.session.currentUser);
    if (user) {
      res.redirect("/user");
    } else {
      req.session.destroy((err) => {
        if (err) next(err);
        res.render("userSignup");
      });
    }
  } else {
    res.render("userSignup");
  }
});

router.post("/userSignup", registerUser);

// LOGGIN IN AS A USER
router.get("/loginUser", isLoggedOut, (req, res) => {
  res.render("loginUser");
});

router.post("/loginUser", isLoggedOut, (req, res, next) => {
  const { email, password } = req.body;

  if (email === "" || password === "") {
    res.render("routes/auth.routes", {
      errorMessage: "Please enter both, email and password to login.",
    });
    return;
  }

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        console.log("Email not registered. ");
        res.render("loginUser", {
          errorMessage: "User not found and/or incorrect password.",
        });
        return;
      } else if (bcrypt.compareSync(password, user.password)) {
        req.session.currentUser = user;
        res.redirect("/user");
      } else {
        console.log("Incorrect password. ");
        res.render("loginUser", {
          errorMessage: "User not found and/or incorrect password.",
        });
      }
    })
    .catch((error) => next(error));
});

// Logout
router.post("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    if (err) next(err);
    res.redirect("/");
  });
});

// User Profile Page
router.get("/user", isLoggedIn, (req, res) => {
  res.render("user", { userInSession: req.session.currentUser });
});

// SIGNING UP AS A HOST
router.get("/hostSignup", async (req, res, next) => {
  if (req.session.currentUser) {
    const host = await Host.findOne(req.session.currentUser);
    if (host) {
      res.redirect("/host");
    } else {
      req.session.destroy((err) => {
        if (err) next(err);
        res.render("hostSignup");
      });
    }
  } else {
    res.render("hostSignup");
  }
});

router.post("/hostSignup", registerHost);

// LOGGIN IN AS A HOST
router.get("/loginHost", (req, res) => {
  res.render("loginHost");
});

router.post("/loginHost", (req, res, next) => {
  const { email, password } = req.body;

  if (email === "" || password === "") {
    res.render("loginHost", {
      errorMessage: "Please enter both, email and password to login.",
    });
    return;
  }

  Host.findOne({ email })
    .then((host) => {
      if (!host) {
        console.log("Email not registered. ");
        res.render("loginHost", {
          errorMessage: "User not found and/or incorrect password.",
        });
        return;
      } else if (bcrypt.compareSync(password, host.password)) {
        req.session.currentUser = host;
        res.redirect("/host");
      } else {
        console.log("Incorrect password. ");
        res.render("routes/auth.routes", {
          errorMessage: "User not found and/or incorrect password.",
        });
      }
    })
    .catch((error) => next(error));
});

// Logout
router.post("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    if (err) next(err);
    res.redirect("/");
  });
});

// Host Profile Page
router.get("/host", isLoggedIn, (req, res) => {
  res.render("host", { userInSession: req.session.currentUser });
});

module.exports = router;
