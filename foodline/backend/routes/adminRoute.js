// external module
const express = require("express");
const adminRoute = express.Router();

//user route
adminRoute.route("adminLogin").post();
adminRoute.route("adminSignup").post();

module.exports = adminRoute;
