const mongoose = require('mongoose');

const ParkingSpaceSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'available',
  },
});

const ParkingSpace = mongoose.model('ParkingSpace', ParkingSpaceSchema);
module.exports = ParkingSpace;