const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking.model");
const {
  createBooking,
  updateBooking,
  deleteBooking,
  findBooking,
} = require("../controllers/booking");

// Create Booking
router.post("/booking/", createBooking);

router.get("/booking/:bookingId", findBooking);

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
