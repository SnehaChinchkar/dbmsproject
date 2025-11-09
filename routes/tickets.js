const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  phone: {
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
  Train_id: {
    type: Number,
    required: true
  },
  Train_name: {
    type: String,
    required: true
  },
  Tickets: {
    type: Number,
    required: true
  },
  Departure_day: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Ticket', ticketSchema);
