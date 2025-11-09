require('dotenv').config();
const mongoose = require('mongoose');
const Train = require('./routes/trains'); // adjust if your file is in /models

const trains = [
  {
    "Train_id": 1,
    "Train_name": "Express 1",
    "Departure_station_id": 101,
    "Arrival_station_id": 201,
    "Departure_time": "08:00:00",
    "Arrival_time": "12:00:00",
    "Total_seats": 400,
    "Available_seats": 400,
    "Fare": 500.00,
    "Departure_day": ["Monday", "Wednesday", "Friday"]
  },
  {
    "Train_id": 4,
    "Train_name": "City Express",
    "Departure_station_id": 101,
    "Arrival_station_id": 204,
    "Departure_time": "14:00:00",
    "Arrival_time": "18:30:00",
    "Total_seats": 200,
    "Available_seats": 200,
    "Fare": 400.00,
    "Departure_day": ["Monday", "Thursday"]
  },
  {
    "Train_id": 9,
    "Train_name": "Rajdhani Express",
    "Departure_station_id": 108,
    "Arrival_station_id": 208,
    "Departure_time": "18:00:00",
    "Arrival_time": "06:00:00",
    "Total_seats": 600,
    "Available_seats": 600,
    "Fare": 1200.00,
    "Departure_day": ["Monday", "Thursday", "Saturday"]
  }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    await Train.insertMany(trains);
    console.log('✅ Trains inserted successfully');
    mongoose.connection.close();
  })
  .catch(err => console.error(err));
