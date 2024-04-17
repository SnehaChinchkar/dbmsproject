const mongoose =require ("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/practiceUser");

const plm = require("passport-local-mongoose");

const userschema=mongoose.Schema({
  username: String,
  email: String,
  password:String,
  
  // secret:String

});
userschema.plugin(plm);
module.exports= mongoose.model("users",userschema);
