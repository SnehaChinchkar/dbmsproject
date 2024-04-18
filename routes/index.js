var express = require('express');
var router = express.Router();
const userModel=require("./users");
const trainModel=require("./trains");
const passport = require('passport');

const localStrategy= require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));



// router.get('/search_result', async function(req, res) {
//   const result1 = await userModel.find({ Departure_station_id: req.trains.Departure_station_id ,Arrival_station_id:req.trains.Arrival_station_id });
  
//   const dep_station= result1.Departure_station_id;
//   res.render('search_result', { depstation:result1[0].Departure_station_id, arrstation:result1[0].Arrival_station_id, train:result1[0].Train_id}); // Pass the username to the profile page
// });

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



