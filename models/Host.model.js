const mongoose = require("mongoose");

const HostSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  isAdmin: { type: Boolean, default: true },
  dateJoined: { type: Date, default: Date.now },
  createdProperties: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Property" },
  ],
});

const Host = mongoose.model("Host", HostSchema);

module.exports = Host;
