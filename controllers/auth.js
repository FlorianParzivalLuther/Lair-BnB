const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model.js");
const Host = require("../models/Host.model.js");
const mongoose = require("mongoose");

// Register User

const registerUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, phoneNumber, dateJoined } =
      req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      phoneNumber,
      dateJoined,
    });

    if (!firstName || !lastName || !email || !password || !phoneNumber) {
      res.render("resgister", { errorMessage: "All fields are mandatory." });
    }

    const savedUser = await newUser.save();
    res.status(200).redirect("/loginUser");
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(500).render("register", { errorMessage: error.message });
    } else if (error.code === 11000) {
      console.log(
        " Username and email need to be unique. Either username or email is already used. "
      );

      res.status(500).render("register", {
        errorMessage: "User not found and/or incorrect password.",
      });
    } else {
      next(error);
    }
  }
};

// Register Host

const registerHost = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, phoneNumber, dateJoined } =
      req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newHost = new Host({
      firstName,
      lastName,
      email,
      password: passwordHash,
      phoneNumber,
      dateJoined,
    });

    if (!firstName || !lastName || !email || !password || !phoneNumber) {
      res.render("resgister", { errorMessage: "All fields are mandatory." });
    }

    const savedHost = await newHost.save();
    res.status(200).redirect("/loginHost");
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(500).render("register", { errorMessage: error.message });
    } else if (error.code === 11000) {
      console.log(
        " Username and email need to be unique. Either username or email is already used. "
      );

      res.status(500).render("register", {
        errorMessage: "User not found and/or incorrect password.",
      });
    } else {
      next(error);
    }
  }
};

// LOGIN USER

const loginUser = async (req, res, next) => {
  try {
    console.log("SESSION =====>", req.session);
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user)
      return res.status(400).render("loginUser", {
        errorMessage: "User not valid. Please signup.",
      });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.render("userLogin", { errorMessage: "Incorrect password" });

    // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;

    req.session.currentUser = user;
    console.log(user);
    res.redirect("/user");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LOGIN HOST
const loginHost = async (req, res, next) => {
  try {
    console.log("SESSION =====>", req.session);
    const { email, password } = req.body;
    const host = await host.findOne({ email: email });

    if (!host)
      return res.status(400).render("loginHost", {
        errorMessage: "User not valid. Please signup.",
      });

    const isMatch = await bcrypt.compare(password, host.password);
    if (!isMatch)
      return res.render("host", { errorMessage: "Incorrect password" });

    // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete host.password;

    req.session.currentUser = host;
    console.log(host);
    res.redirect("/host");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { loginUser, loginHost, registerHost, registerUser };
