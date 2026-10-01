require("dotenv").config();
const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4","0.0.0.0"]);
const mongoose=require("mongoose");





function Database(){
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
      console.log("db connect successfully");
    })
}

module.exports=Database;



