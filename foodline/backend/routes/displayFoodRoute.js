// external module
const express = require("express");
const displayFoodRoute = express.Router();

//internal module
const fetchFoodItems = require("../middleware/displayFoodFetch");
const displayFood = require("../controller/displayFoodController");


displayFoodRoute.route("/foodData").post(fetchFoodItems,displayFood);

module.exports = displayFoodRoute;
