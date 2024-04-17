const mongoose =require ("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/practiceUser");

const plm = require("passport-local-mongoose");

const trainschema=mongoose.Schema({
    username: String,
    email: String,
    password:String,
    // secret:String
        Train_id: Number,
        Train_name: String,
        Departure_station_id :Number,
        Arrival_station_id :Number,
        Departure_time :String,
        Arrival_time :String,
        Total_seats :Number,
        Available_seats:Number,
        Fare :Number,
        Departure_day :{
            type:Array,
            default:[]
        }
  
  });
  trainschema.plugin(plm);
  module.exports= mongoose.model("trains",trainschema);