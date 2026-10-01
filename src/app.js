const express=require("express");
const app=express();
app.use(express.json());
const userroute=require("./routers/auth.routers");
const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use("/api/auth",userroute);





module.exports=app;







