const mongoose = require('mongoose');
require('dotenv').config();

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);

    const ParkingSpace = require('./models/ParkingSpace');

    const spaces = [
      { location: 'Location 417', status: 'Available' },
      { location: 'Location 418', status: 'Occupied' },
      // Add more spaces as needed
    ];

    await ParkingSpace.insertMany(spaces);

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (err) {
    console.error('Database seeding error:', err);
    process.exit(1);
  }
};

seedData();