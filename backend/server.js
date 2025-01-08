require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const https = require('https');
const authRoutes = require('./routes/auth');
const parkingSpacesRoutes = require('./routes/parkingSpaces');
const paymentRoutes = require('./routes/payments'); // Import the payments route
require('dotenv').config();

const app = express();

// Log environment variables (for debugging purposes)
console.log('MONGO_URI:', process.env.MONGO_URI);
console.log('JWT_SECRET:', process.env.JWT_SECRET);

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', parkingSpacesRoutes);
app.use('/api/payments', paymentRoutes); // Use the payments route

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to ParkRight Solutions API');
});

// Anything that doesn't match the above routes, send back the React index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// Load SSL certificates
const privateKey = fs.readFileSync('./server.key', 'utf8');
const certificate = fs.readFileSync('./server.cert', 'utf8');
const credentials = { key: privateKey, cert: certificate };

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the process with an error code
  });

// Create HTTPS server
const httpsServer = https.createServer(credentials, app);

// Start HTTPS server
const PORT = process.env.PORT || 5000;
httpsServer.listen(PORT, () => {
  console.log(`HTTPS Server running on port ${PORT}`);
});