const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model.js");
const mongoose = require("mongoose");

// Register User

const register = async (req, res) => {
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
    res.status(200).redirect("/login");
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

// Logging in
const login = async (req, res) => {
  try {
    // console.log("SESSION =====>", req.session);
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user)
      return res.status(400).render("login", {
        errorMessage: "User not valid. Please signup.",
      });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400);

    // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;

    res.status(200).render("user", { userInSession: user });
    req.session.currentUser = user;
    res.redirect("/user");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { register, login };
