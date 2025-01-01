const express = require('express');
const router = express.Router();
const ParkingSpace = require('../models/ParkingSpace');

// Endpoint to get parking spaces
router.get('/parking-spaces', async (req, res) => {
  try {
    const spaces = await ParkingSpace.find();
    res.json(spaces);
  } catch (error) {
    console.error('Error fetching spaces:', error);
    res.status(500).send('Server error');
  }
});

module.exports = router;