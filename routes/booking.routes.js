const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking.model");


router.get("/booking/:bookingId", async (req, res) => {
  // Get a specific booking by ID
  try {
    const booking = await Booking.findById(req.params.bookingId);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.json(booking);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Rendering example
router.get("/booking", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.render("booking", { bookings });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
