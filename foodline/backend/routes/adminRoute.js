// external module
const express = require("express");
const adminRoute = express.Router();

//internal module
const { createUserAndAdminValidationRules, validate, loginValidationRules } = require("../middleware/inputValidator");
const {createAdmin, loginAdmin} = require("../controller/adminController");

//user route
adminRoute.route("/adminSignup").post(createUserAndAdminValidationRules,validate,createAdmin);
adminRoute.route("/adminLogin").post(loginValidationRules,validate,loginAdmin);

module.exports = adminRoute;
