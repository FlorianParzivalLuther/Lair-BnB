const { Router } = require("express");
const router = new Router();
const { register } = require("../controllers/auth.js");
const express = require("express");
const { login } = require("../controllers/auth.js");
const { verifyToken } = require("../middleware/auth.middleware.js");
const {
  isLoggedIn,
  isLoggedOut,
} = require("../middleware/route-guard.middleware.js");

// Rendering Signup Page for users
router.get("/signup", (req, res) => {
  res.render("register");
});

// Register is defined in the controlers/auth.js
router.post("/signup", register);

// Render Login Page for users
router.get("/login", isLoggedOut, (req, res) => {
  res.render("login");
});

// Login
router.post("/login", login);

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

// BECOMING A HOST //

router.get("/becomeHost", (req, res) => {
  res.render("register");
});

// Register is defined in the controlers/auth.js
router.post("/becomeHost", register);

// Render Login Page for users
router.get("/becomeHost", (req, res) => {
  res.render("becomeHost");
});

// Login
router.post("/becomeHost", login);

// Logout
router.post("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    if (err) next(err);
    res.redirect("/");
  });
});

// User Profile Page
router.get("/host", (req, res) => {
  res.render("host", { userInSession: req.session.currentUser });
});

module.exports = router;
