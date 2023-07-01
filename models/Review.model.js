const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  property: { type: mongoose.Schema.Types.ObjectId, ref: "Property" },
  guest: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  rating: { type: Number, required: true },
  comment: { type: String },
  datePosted: { type: Date, default: Date.now },
});

const Review = mongoose.model("Review", ReviewSchema);

module.exports = {
  User,
  Property,
  Booking,
  Review,
};

module.exports = Review;
