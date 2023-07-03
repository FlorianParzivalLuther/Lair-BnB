const { Router } = require("express");
const router = new Router();
const { register } = require("../controllers/auth.js");
const express = require("express");
const { login } = require("../controllers/auth.js");
const { verifyToken } = require("../middleware/auth.middleware.js");

// Rendering Signup Page for users
router.get("/signup", (req, res) => {
  res.render("register");
});

// Register is defined in the controlers/auth.js
router.post("/signup", register);

// Render Login Page for users
router.get("/login", (req, res) => {
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
router.get("/user", (req, res) => {
  res.render("user", { userInSession: req.session.currentUser });
});

module.exports = router;
