const mongoose = require('mongoose');
const ParkingSpace = require('./models/ParkingSpace');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Database connected');
    seedParkingSpaces();
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });

const seedParkingSpaces = async () => {
  try {
    await ParkingSpace.deleteMany({}); // Clear existing data

    const addresses = [
      "4613 Statesville Rd, Charlotte, NC 28269",
      "3508 Robinson Circle, Charlotte, NC 28206",
      "609 W 28th Street, Charlotte, NC 28206",
      "3901 N Graham St, Charlotte, NC 28206",
      "3826 Raleigh Street, Charlotte, NC 28206",
      "1220 Culp Rd., Pineville, NC 28134",
      "4918 Rozzelles Ferry Rd, Charlotte, NC 28216",
      "1437 Delta Drive, Gastonia, NC 28052",
      "5233 Rozzelles Ferry Rd, Charlotte, NC 28216",
      "2700 N Tryon St., Charlotte, NC 28206",
      "215 Godley Lane, Charlotte, NC 28216",
      "100 Dalton Ave, Charlotte, NC 28206",
      "2200 Watkins Road, Columbus, OH 43207",
      "160 Anderson Rd., N Rock Hill, SC 29730"
    ];

    const parkingSpaces = addresses.map(address => ({
      address,
      city: address.split(', ')[1],
      state: address.split(', ')[2].split(' ')[0],
      zipCode: address.split(', ')[2].split(' ')[1],
      status: 'Available'
    }));

    await ParkingSpace.insertMany(parkingSpaces);
    console.log('Parking spaces seeded successfully');
    mongoose.connection.close();
  } catch (err) {
    console.error('Seeding error:', err);
    mongoose.connection.close();
  }
};