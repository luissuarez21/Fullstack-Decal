const express = require('express');
const axios = require('axios');
const router = express.Router();
const Trip = require('../models/Trip');

// POST /api/trips - Create a new trip
router.post('/', async (req, res) => {
  try {
    const { city, startDate, endDate, notes } = req.body;

    if (!city || !startDate || !endDate) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Fetch weather from OpenWeatherMap
    let weather = {};
    try {
      const apiKey = process.env.OPENWEATHER_API_KEY;
      if (apiKey) {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        const { main, weather: weatherData } = response.data;
        weather = {
          temp: Math.round(main.temp),
          description: weatherData[0].main,
          humidity: main.humidity,
        };
      }
    } catch (err) {
      console.log('Weather fetch failed, continuing without weather');
    }

    const trip = new Trip({
      city,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      notes,
      weather,
    });

    await trip.save();
    res.json(trip);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create trip' });
  }
});

// GET /api/trips - Get all trips
router.get('/', async (req, res) => {
  try {
    const trips = await Trip.find();
    res.json(trips);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch trips' });
  }
});

// GET /api/trips/:id - Get a specific trip
router.get('/:id', async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }
    res.json(trip);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch trip' });
  }
});

module.exports = router;
