require("dotenv").config;
const mongoose=require("mongoose");
const Usermodel=require("../model/user.model");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");




async function registercontroller(req,res){
    const {name,username,email,password}=req.body;
    if(!name ||!username||!email||!password){
        return res.status(400).json({
            message:"Please provide all details"
        })
    }

    const userexist=await Usermodel.findOne({username});
    if(userexist){
        return res.status(409).json({
            message:"Username Already exist provide another username " 
        })
    }
    const user=await Usermodel.create({
        name,
        username,
        email,
        password:bcrypt.hashSync(password,10)
    })
    const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
    res.cookie("token",token);

    return res.status(200).json({
        message:"user registered successfully"
    })
     


}


async function logincontroller(req,res){
    const {username,password}=req.body;
    const user=await Usermodel.findOne({username});
    if(!user){
        return res.status(409).json({
            message:"user not found"
        })
    }
    const ispassValid= await bcrypt.compare(password,user.password);
    if(!ispassValid){
        return res.status(400).json({
            message:"Password is Invalid"
        })
    }
 
    const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
    res.cookie("token",token);

    return res.status(200).json({
        message:"user loged In Successfully",
        token:token
    })


}


async function logoutcontroller(req, res) {
  
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", 
    sameSite: "strict"
  });

  return res.status(200).json({
    message: "User logged out successfully"
  });
}








module.exports={registercontroller,logincontroller,logoutcontroller};


