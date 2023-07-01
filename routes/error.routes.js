const express = require('express');
const router = express.Router();

// Error route - handles errors
router.use((err, req, res, next) => {
  res.status(500).render('error', {
    errorMessage: 'Internal Server Error'
  });
});

module.exports = router;