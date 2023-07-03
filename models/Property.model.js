const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  amenities: [String],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  images: [String], //6 pics
});

const Property = mongoose.model("Property", PropertySchema);

module.exports = Property;
