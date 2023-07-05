const session = require("express-session");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");

module.exports = (app) => {
  app.set("trust proxy", 1);

  // use session
  app.use(
    session({
      secret: process.env.SESS_SECRET,
      resave: true,
      saveUninitialized: false,
      cookie: {
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 10 * 60 * 1000,
      },
      store: MongoStore.create({
        mongoUrl: process.env.DATABASE || "'mongodb://127.0.0.1:27017/'", /// Not sure what to add to the local host part
      }),
    })
  );
};
