const mongoose = require('mongoose');

const ParkingSpaceSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const ParkingSpace = mongoose.model('ParkingSpace', ParkingSpaceSchema);
module.exports = ParkingSpace;