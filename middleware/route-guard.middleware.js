const express = require("express");
const app = express();

const isUserLoggedIn = (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect("/loginUser");
  }
  next();
};

const isUserLoggedOut = (req, res, next) => {
  if (req.session.currentUser) {
    return res.redirect("/user");
  }
  next();
};

const isHostLoggedIn = (req, res, next) => {
  if (!req.session.currentHost) {
    return res.redirect("/loginHost");
  }
  next();
};

const isHostLoggedOut = (req, res, next) => {
  if (req.session.currentHost) {
    return res.redirect("/host");
  }
  next();
};

module.exports = {
  isUserLoggedIn,
  isUserLoggedOut,
  isHostLoggedIn,
  isHostLoggedOut,
};
