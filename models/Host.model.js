const mongoose = require("mongoose");

const HostSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  dateJoined: { type: Date, default: Date.now },
});

const User = mongoose.model("Host", HostSchema);

module.exports = Host;
