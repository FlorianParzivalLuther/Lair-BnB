const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Booking = require("../models/Booking.model");

const getCheckoutSession = async (req, res, next) => {
  const booking = await Booking.findById(req.params.bookingId)
    .populate("guest", "property")
    .exec();

  res.render("booking", {
    booking,
    property: booking.property,
    guest: booking.guest,
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    success_url: `${req.protocol}://${req.get("host")}/`,
    cancel_url: `${req.protocol}://${req.get("host")}`,
    customer_email: booking.guest.email, // find user email --> probably need to change this
    client_reference_id: req.params.bookingId,
    line_items: [
      {
        name: booking.property.name,
        description: booking.property.description,
        currency: "eur",
        amount: booking.totalPrice,
        quantity: 1,ç
      },
    ],
  });

  res.status(200).json({
    status: "success",
    session,
  });
};

module.exports = { getCheckoutSession };
