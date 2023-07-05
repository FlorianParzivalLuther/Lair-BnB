const express = require('express')
const app = express()

const isLoggedIn = (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect("/loginUser");
  }
  next();
};

const isLoggedOut = (req, res, next) => {
  if (req.session.currentUser) {
    return res.redirect("/user");
  }
  next();
};

module.exports = { isLoggedIn, isLoggedOut };
