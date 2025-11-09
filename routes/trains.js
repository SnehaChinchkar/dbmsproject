const mongoose = require('mongoose');

const trainSchema = new mongoose.Schema({
  Train_id: {
    type: Number,
    required: true,
    unique: true
  },
  Train_name: {
    type: String,
    required: true
  },
  Departure_station_id: {
    type: Number,
    required: true
  },
  Arrival_station_id: {
    type: Number,
    required: true
  },
  Departure_time: {
    type: String,
    required: true
  },
  Arrival_time: {
    type: String,
    required: true
  },
  Total_seats: {
    type: Number,
    required: true
  },
  Available_seats: {
    type: Number,
    required: true
  },
  Fare: {
    type: Number,
    required: true
  },
  Departure_day: {
    type: [String],
    default: []
  }
});

module.exports = mongoose.model('Train', trainSchema);
