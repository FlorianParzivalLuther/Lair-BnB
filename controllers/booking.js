const Booking = require("../models/Booking.model");
const Property = require("../models/Property.model");

const createBooking = async (req, res) => {
  if (!req.session.currentUser) {
    return res.redirect("/loginUser");
  }

  const { startDate, endDate, guests, totalPrice } = req.body;
  const propertyId = req.body.propertyId;
  const userId = req.session.currentUser._id;

  console.log(userId);
  console.log(propertyId);
  console.log(req.body);

  try {
    const newBooking = new Booking({
      property: propertyId,
      guest: userId,
      startDate,
      endDate,
      guests,
      totalPrice,
    });

    const savedBooking = await newBooking.save();

    res.status(201).redirect(`/booking/${savedBooking._id}`);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Edit Booking

const updateBooking = async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.bookingId,
      {
        $set: req.body,
      },
      { new: true }
    );
    // console.log(updatedProperty);
    res.status(200).redirect(`/booking/${updatedBooking._id}`);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Find and Render Booking

const findBooking = async (req, res) => {
  // Get a specific booking by ID

  try {
    const booking = await Booking.findById(req.params.bookingId)
      .populate("property")
      .exec();
    console.log(booking);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.render("booking", { booking, property: booking.property });

    console.log(booking.property);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// DELETE PROPERTY
const deleteBooking = async (req, res) => {
  try {
    const bookingId = req.params.bookingId;

    await Booking.findByIdAndDelete(bookingId);
    res.status(200).redirect("/"); // redirects to home page?
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { createBooking, updateBooking, deleteBooking, findBooking };
