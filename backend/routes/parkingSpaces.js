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

// Endpoint to add a new parking space
router.post('/parking-spaces', async (req, res) => {
  const { address, city, state, zipCode } = req.body;
  try {
    const newSpace = new ParkingSpace({ address, city, state, zipCode });
    await newSpace.save();
    res.status(201).json(newSpace);
  } catch (error) {
    console.error('Error adding new space:', error);
    res.status(500).send('Server error');
  }
});

// Endpoint to delete a parking space
router.delete('/parking-spaces/:id', async (req, res) => {
  try {
    const space = await ParkingSpace.findByIdAndDelete(req.params.id);
    if (!space) {
      return res.status(404).send('Parking space not found');
    }
    res.status(200).json({ message: 'Parking space deleted' });
  } catch (error) {
    console.error('Error deleting space:', error);
    res.status(500).send('Server error');
  }
});

// Endpoint to update a parking space
router.put('/parking-spaces/:id', async (req, res) => {
  const { address, city, state, zipCode } = req.body;
  try {
    const space = await ParkingSpace.findByIdAndUpdate(
      req.params.id,
      { address, city, state, zipCode },
      { new: true }
    );
    if (!space) {
      return res.status(404).send('Parking space not found');
    }
    res.status(200).json(space);
  } catch (error) {
    console.error('Error updating space:', error);
    res.status(500).send('Server error');
  }
});

module.exports = router;