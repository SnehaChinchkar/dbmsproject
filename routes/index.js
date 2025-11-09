var express = require('express');
var router = express.Router();
const userModel = require('../routes/users');
const ticketModel = require('../routes/tickets');
const trainModel = require('../routes/trains');
const passport = require('passport');
const localStrategy = require('passport-local');

passport.use(new localStrategy(userModel.authenticate()));

router.get('/view-result', async function(req, res) {
  const departureStationId = Number(req.query.Departure_station_id);
  const arrivalStationId = Number(req.query.Arrival_station_id);
  const dep_day = req.query.Departure_day ? req.query.Departure_day.trim() : null;

  try {
    const query = {
      Departure_station_id: departureStationId,
      Arrival_station_id: arrivalStationId
    };
    // if (dep_day) query.Departure_day = { $in: [dep_day] };
    if (dep_day) {
      query.Departure_day = { $regex: new RegExp(`^${dep_day}$`, 'i') };
    }

    const result1 = await trainModel.find(query);
    // console.log("Search query:", query);
    // console.log("Found trains:", result1.length);

    res.render('search_result', { result1 });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  }
});


router.post('/search-result', function(req, res) {
  const departureStationId = req.body.Departure_station_id;
  const arrivalStationId = req.body.Arrival_station_id;
  const dep_day = req.body.Departure_day;
  res.redirect(`/view-result?Departure_station_id=${departureStationId}&Arrival_station_id=${arrivalStationId}&Departure_day=${dep_day}`);
});

router.get('/', function(req, res) {
  res.render('home');
});

router.get('/login-page', function(req, res) {
  res.render('index');
});

router.get('/register-page', function(req, res) {
  res.render('registerpg');
});

router.get('/help', function(req, res) {
  res.render('help');
});

router.get('/profile', isLoggedIn, async function(req, res) {
  const result1 = await userModel.findOne({ username: req.user.username });
  res.render('profile', { username: req.user.username, email: result1.email });
});

router.get('/book-page', function(req, res) {
  res.render('book');
});

router.get('/view-ticket', isLoggedIn, async function(req, res) {
  const result2 = await ticketModel.find({ username: req.user.username });
  res.render('ticketlist', { result2 });
});

router.post('/book-save', isLoggedIn, async function(req, res) {
  const ticketData = {
    username: req.user.username,
    name: req.body.name,
    gender: req.body.gender,
    age: req.body.age,
    phone: req.body.phone,
    Departure_station_id: req.body.Departure_station_id,
    Arrival_station_id: req.body.Arrival_station_id,
    Train_id: req.body.Train_id,
    Train_name: req.body.Train_name,
    Tickets: req.body.Tickets,
    Departure_day: req.body.Departure_day
  };

  const train = await trainModel.findOne({
    Train_id: req.body.Train_id,
    Departure_station_id: req.body.Departure_station_id,
    Arrival_station_id: req.body.Arrival_station_id
  });

  if (!train) return res.status(404).send('Train not found');
  if (train.Available_seats < ticketData.Tickets) return res.status(400).send('Not enough available seats');

  await trainModel.updateOne(
    { _id: train._id },
    { $inc: { Available_seats: -ticketData.Tickets } }
  );

  ticketModel.create(ticketData)
    .then(() => res.redirect('/view-ticket'))
    .catch(err => {
      console.error('Error saving ticket:', err);
      res.status(500).send('Error saving ticket');
    });
});

router.post('/register', function(req, res) {
  const userdata = new userModel({
    username: req.body.username,
    email: req.body.email
  });

  userModel.register(userdata, req.body.password)
    .then(() => {
      passport.authenticate('local')(req, res, function() {
        res.redirect('/profile');
      });
    });
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/login-page'
}));

router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) return next(err);
    res.redirect('/login-page');
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/');
}

module.exports = router;
