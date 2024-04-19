const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ticketSchema = new Schema({
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
  Departure_day:{
    type:String,
    required:true
  }
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
