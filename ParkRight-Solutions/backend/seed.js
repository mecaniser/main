const mongoose = require('mongoose');
const ParkingSpace = require('./models/ParkingSpace');
require('dotenv').config();

const seedParkingSpaces = async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const spaces = [
    { location: 'Location 417', status: 'Available' },
    { location: 'Location 418', status: 'Occupied' },
    // Add more spaces as needed
  ];

  await ParkingSpace.insertMany(spaces);
  console.log('Database seeded!');
  mongoose.disconnect();
};

seedParkingSpaces();