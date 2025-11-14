const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/test/key', (req, res) => {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  res.json({ 
    hasKey: !!apiKey,
    keyLength: apiKey?.length || 0,
    firstChars: apiKey?.substring(0, 5) + '...' || 'NO KEY'
  });
});


router.get('/:city', async (req, res) => {
  try {
    const { city } = req.params;
    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!apiKey) {
      return res.status(400).json({ error: 'Weather API key not configured' });
    }

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    const { main, weather } = response.data;

    const weatherData = {
      temp: Math.round(main.temp),
      description: weather[0].main,
      humidity: main.humidity,
      icon: weather[0].icon,
    };

    res.json(weatherData);
  } catch (error) {
    console.error('Weather API error:', error.message);
    console.error('Full error:', error.response?.data || error);
    res.status(500).json({ 
      error: 'Failed to fetch weather data',
      details: error.response?.data?.message || error.message
    });
  }
});

module.exports = router;
