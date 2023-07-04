// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// Will want to add this for added security
// const morgan = require("morgan");
// const helmet = require("helmet");

// app.use(morgan("common"));
// app.use(
//   helmet({
//     contentSecurityPolicy: {
//       directives: {
//         ...helmet.contentSecurityPolicy.getDefaultDirectives(),
//         "img-src": ["'data'", "http://localhost:3000"],
//       },
//     },
//   })
// );


const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dnit8gqhj",
  api_key: "285367553745546",
  api_secret: "ehIqrvtwvlG-CdVUAdgId5xTMgU",
});

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);
require("./config/session.config")(app);

// default value for title local
const capitalize = require("./utils/capitalize");
const projectName = "project-2";

app.locals.appTitle = `${capitalize(projectName)} created with IronLauncher`;

// 👇 Start handling routes here
const authRoutes = require("./routes/auth.routes");
app.use("/", authRoutes);

const homeRoutes = require("./routes/home.routes");
app.use("/", homeRoutes);
const bookingRoutes = require("./routes/booking.routes");
app.use("/booking", bookingRoutes);
const errorRoutes = require("./routes/error.routes");
app.use("/error", errorRoutes);
const propertyRoutes = require("./routes/property.routes");
app.use("/property", propertyRoutes);
const reviewRoutes = require("./routes/review.routes");
app.use("/review", reviewRoutes);
const userRoutes = require("./routes/user.routes");
app.use("/user", userRoutes);
const hostRoutes = require("./routes/host.routes");
app.use("/host", hostRoutes);

const userLogin = require("./routes/auth.routes");
app.use("/userLogin", userLogin);
const hostLogin = require("./routes/auth.routes");
app.use("/hostLogin", hostLogin);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
