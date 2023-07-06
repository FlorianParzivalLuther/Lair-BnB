const express = require("express");
const { getCheckoutSession } = require("../controllers/checkout");

const router = express.Router();

router.get("/booking/:bookingId/checkout", getCheckoutSession);

module.exports = router;
