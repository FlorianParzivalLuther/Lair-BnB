const Booking = require("../models/Booking.model");

const createBooking = async (req, res) => {
  const { property, guest, startDate, endDate, totalPrice } = req.body;

  console.log(req.body);

  try {
    const newBooking = new Booking({
      property,
      guest,
      startDate,
      endDate,
      totalPrice,
    });

    const savedBooking = await newBooking.save();

    res.status(201).redirect(`/booking/${savedBooking._id}`);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { createBooking };
