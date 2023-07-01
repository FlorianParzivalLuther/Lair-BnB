const express = require('express');
const router = express.Router();

const { User, Property, Booking, Review } = require('../models');



router.get('/reviews', async (req, res) => {
    // Get all reviews
    try {
      const reviews = await Review.find();
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  router.get('/reviews/:reviewId', async (req, res) => {
    // Get a specific review by ID
    try {
      const review = await Review.findById(req.params.reviewId);
      if (!review) {
        return res.status(404).json({ error: 'Review not found' });
      }
      res.json(review);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  module.exports = router;
