// external module
const express = require("express");
const userRoute = express.Router();

//internal module
const {
  validate,
  createUserValidationRules,
  loginValidationRules,
} = require("../middleware/inputValidator");
const {
  createUser,
  loginUser,
  checkOutFood,
  myOrders,
} = require("../controller/userController");

//user route
userRoute
  .route("/createuser")
  .post(createUserValidationRules, validate, createUser);
userRoute.route("/loginuser").post(loginValidationRules, validate, loginUser);
userRoute.route("/orderdata").post(checkOutFood);
userRoute.route("/myorders").post(myOrders);

module.exports = userRoute;
