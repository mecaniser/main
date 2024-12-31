const express = require('express');
const router = express.Router();

// Endpoint to get parking spaces
router.get('/parking-spaces', async (req, res) => {
  try {
    // Replace with your actual logic to fetch parking spaces
    const spaces = [
      { id: 1, location: 'Location 1', status: 'Available' },
      { id: 2, location: 'Location 2', status: 'Occupied' },
      // Add more spaces as needed
    ];
    res.json(spaces);
  } catch (error) {
    console.error('Error fetching spaces:', error);
    res.status(500).send('Server error');
  }
});

module.exports = router;