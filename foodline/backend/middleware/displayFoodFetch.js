//external module
const mongoose = require("mongoose");

//internal module
const foodItemsModel = require("../models/foodItemsModel");

const fetchFoodItems = async (req, res, next) => {
  try {
    
    const fetchData = mongoose.connection.db.collection("foodItems");
    const data = await fetchData.find({}).toArray();

    const foodCategory = mongoose.connection.db.collection("foodCategorys");
    const catData = await foodCategory.find({}).toArray();

    global.foodItems = data;
    global.foodCategorys = catData;

    next();

  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = fetchFoodItems;
