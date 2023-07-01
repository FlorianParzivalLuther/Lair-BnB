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

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// default value for title local
const capitalize = require("./utils/capitalize");
const projectName = "project-2";

app.locals.appTitle = `${capitalize(projectName)} created with IronLauncher`;

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);
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

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
