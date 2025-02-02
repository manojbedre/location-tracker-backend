const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // Load environment variables

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB (Replace with your actual MongoDB URI)
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ Define Schema & Model
const LocationSchema = new mongoose.Schema({
    latitude: Number,
    longitude: Number,
    timestamp: { type: Date, default: Date.now }
});

const Location = mongoose.model("Location", LocationSchema);

// ✅ API to Save Location
app.post("/location/update", async (req, res) => {
    const { latitude, longitude } = req.body;

    if (typeof latitude !== "number" || typeof longitude !== "number") {
        return res.status(400).json({ error: "Latitude and longitude must be numbers." });
    }

    try {
        const newLocation = new Location({ latitude, longitude });
        await newLocation.save();
        console.log(`📍 Location Saved: ${latitude}, ${longitude}`);

        res.status(200).json({ message: "Location saved!", latitude, longitude });
    } catch (error) {
        res.status(500).json({ error: "Failed to save location" });
    }
});

// ✅ Start the Server
app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
});
