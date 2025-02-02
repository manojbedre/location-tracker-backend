const express = require('express');
const cors = require('cors');

const app = express();  // Make sure this line is present before using app

const port = 5000;

// Enable CORS to allow frontend requests
app.use(cors());

// Middleware to parse JSON data
app.use(express.json());

// Endpoint to receive location data
app.post('/save-location', (req, res) => {
    const { latitude, longitude } = req.body;
  
    if (typeof latitude !== 'number' || typeof longitude !== 'number') {
      return res.status(400).json({ error: 'Latitude and longitude must be numbers.' });
    }
  
    console.log(`Received location: Latitude = ${latitude}, Longitude = ${longitude}`);
  
    res.status(200).json({
      message: 'Location received successfully!',
      latitude,
      longitude,
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
