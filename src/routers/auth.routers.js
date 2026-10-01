const express=require("express");
const {registercontroller,logincontroller, logoutcontroller}=require("../controllers/auth.controllers");
const authMiddleware=require("../middleware/auth.middleware");
const Router=express.Router();
const {profilecontrollers}=require("../controllers/profile.controllers");


Router.post("/register",registercontroller);
Router.post("/login",logincontroller);
Router.post("/logout",logoutcontroller);
Router.get("/profile",authMiddleware,profilecontrollers);



module.exports=Router;

