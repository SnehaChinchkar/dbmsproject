var express = require('express');
var router = express.Router();
const userModel=require("./users");
const trainModel=require("./trains");
const passport = require('passport');

const localStrategy= require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));



router.get('/view-result', async function(req, res) {
  const departureStationId = req.query.Departure_station_id;
  const arrivalStationId = req.query.Arrival_station_id;
  const dep_day=req.query.Departure_day;
  console.log(dep_day);
  try {
    let result1 = await trainModel.find({ 
      Departure_station_id: departureStationId,
      Arrival_station_id: arrivalStationId,
      Departure_day: { $in: dep_day }
    });
    res.render('search_result', { result1: result1 });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  }
});




router.post('/search-result', function(req, res) {
  // Extract the parameters from the request body
  const departureStationId = req.body.Departure_station_id;
  const arrivalStationId = req.body.Arrival_station_id;
  const dep_day=req.body.Departure_day;
  // Redirect to /view-result with the parameters
  res.redirect(`/view-result?Departure_station_id=${departureStationId}&Arrival_station_id=${arrivalStationId}&Departure_day=${dep_day}`);
});


router.get('/', function(req, res, next) {
  res.render('home');
});

router.get('/login-page', function(req, res, next) {
  res.render('index');
});
router.get('/register-page',function(req,res){
  res.render('registerpg');
})
// router.get('/profile',isLoggedIn,function(req,res,next){
//   res.render('profile');
// })

router.get('/profile', isLoggedIn, async function(req, res) {
  const result1 = await userModel.find({ username: req.user.username });
  
  const emailid= result1.email;
  res.render('profile', { username: req.user.username , email:result1[0].email}); // Pass the username to the profile page
});





router.post('/register',function(req,res){
var userdata= new userModel({
  username:req.body.username,
  email:req.body.email
})

userModel.register(userdata,req.body.password).then(function(registereduser){
  passport.authenticate("local")(req,res,function(){
    res.redirect('/profile');
  })
})
});
router.post('/login',passport.authenticate("local",{
  successRedirect:"/profile",
  failureRedirect:'/'
}),function(req,res){ })

router.get('/logout',function(req,res,next){
  req.logout(function(err){
    if (err) {return next(err);}
    res.redirect('/login-page');
  })
})

function isLoggedIn(req,res,next){
  if(req.isAuthenticated){
    return next();
  }
  res.redirect('/');
}

module.exports = router;



