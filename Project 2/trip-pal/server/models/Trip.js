const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  city: String,
  startDate: Date,
  endDate: Date,
  notes: String,
  weather: {
    temp: Number,
    description: String,
    humidity: Number,
  },
});

module.exports = mongoose.model('Trip', tripSchema);
