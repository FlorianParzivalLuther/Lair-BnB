const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  property: { type: mongoose.Schema.Types.ObjectId, ref: "Property" },
  guest: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  totalPrice: { type: Number, required: true },
  guests: {
    type: Number,
    required: true,
  },
});

const Booking = mongoose.model("Booking", BookingSchema);

module.exports = Booking;
