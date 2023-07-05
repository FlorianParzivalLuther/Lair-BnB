const Booking = required("../models/Booking.model");

const getCheckoutSession = async(req, res, next) => {

    const booking = await Booking.findById(req.params.bookingId);



    
}
