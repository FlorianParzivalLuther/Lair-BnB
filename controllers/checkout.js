const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Booking = require("../models/Booking.model");

const getCheckoutSession = async (req, res, next) => {
  const booking = await Booking.findById(req.params.bookingId);

  stripe.checkout.session.create({
    payment_method_types: ["card"],
    success_url: `${req.protocol}://${req.get("host")}/`,
    cancel_url: `${req.protocol}://${req.get("host")}`,
    customer_email: req.user.email, // find user email --> probably need to change this
    client_reference_id: req.params.bookingId,
    //     line_items: [
    //         {
    // name: `${booking.name}` // Need to add the property so we get the name
    // description: booking.description /// need to add the property as well

    //         }]
  });
};
