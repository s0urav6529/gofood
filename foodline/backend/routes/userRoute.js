const express = require("express");
const userRoute = express.Router();
const userModel = require("../models/User");

userRoute.route("/register").post(async(req,res)=>{
    try {
        await userModel.create({
            name:"sourav",
            location:"hjsdfsd",
            email:"sourav@gmail.com",
            password:"12345",
        })
        res.json({success:true});
    } catch (error) {
        res.json({success:false});
    }
});

module.exports = userRoute;