var express = require('express');
var router = express.Router();
const userModel=require("./users");
const trainModel=require("./trains");
const passport = require('passport');

const localStrategy= require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));

router.get('/', function(req, res, next) {
  res.render('home');
});

router.get('/login-page', function(req, res, next) {
  res.render('index');
});
router.get('/register-page',function(req,res){
  res.render('registerpg');
})
router.get('/profile',isLoggedIn,function(req,res,next){
  res.render('profile');
})
router.post('/search-train',function(req,res){
  var trainfound=new trainModel({
    Departure_station_id:req.body.Departure_station_id,
    Arrival_station_id:req.body.Arrival_station_id
    // Departure_day:req.body.Departure_day
  })
})
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



